import { useCallback, useEffect, useMemo, useState } from 'react';
import { animated, to, useSpring } from '@react-spring/web';
import {
  formatCaliforniaDecimalHourLabel,
  getCaliforniaCloudShadowFilterFromTone,
  getCaliforniaCloudShadowLayers,
  getCaliforniaLocalTimeLabel,
  getCaliforniaSkyPhaseLabel,
  getCaliforniaSkyShadowToneForHour,
  getCaliforniaSkyShadowToneNow,
  getLivePresetId,
  getSkyPresetById,
  SKY_PRESET_PHASES,
} from '../utils/californiaSkyShadow';
import cloudIcon from '../assets/cloud-icon.png';
import '../styles/components/_cloudDropIcon.scss';

const CLOUD_ASPECT = 413 / 693;
const SHADOW_REFRESH_MS = 60_000;
const ORBIT_RADIUS = 0.44;
const ORBIT_DEPTH = 0.34;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const CloudDropIcon = ({
  size = 96,
  alt = 'CloudDropDesigns logo',
  className = '',
  showSkyCaption = false,
  defaultMode = 'live',
}) => {
  const [now, setNow] = useState(() => new Date());
  const [mode, setMode] = useState(defaultMode);
  const [activePresetId, setActivePresetId] = useState('dusk');
  const [previewPresetId, setPreviewPresetId] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), SHADOW_REFRESH_MS);
    return () => window.clearInterval(timer);
  }, []);

  const height = Math.round(size * CLOUD_ASPECT);
  const shadowPad = Math.max(6, Math.round(size * 0.05));
  const stageWidth = size + shadowPad * 2;
  const stageHeight = height + shadowPad * 2;
  const orbitRadius = Math.round(size * ORBIT_RADIUS);
  const controlHeight = Math.round(size * 0.24);
  const interactiveWidth = stageWidth + orbitRadius * 2 + 64;
  const interactiveHeight = stageHeight + controlHeight + 32;
  const livePresetId = useMemo(() => getLivePresetId(now), [now]);
  const liveTimeLabel = getCaliforniaLocalTimeLabel(now);

  const tone = useMemo(() => {
    if (previewPresetId) {
      return getCaliforniaSkyShadowToneForHour(getSkyPresetById(previewPresetId).hour);
    }

    if (mode === 'preset') {
      return getCaliforniaSkyShadowToneForHour(getSkyPresetById(activePresetId).hour);
    }

    return getCaliforniaSkyShadowToneNow(now);
  }, [activePresetId, mode, now, previewPresetId]);

  const shadowLayers = getCaliforniaCloudShadowLayers(tone);

  const toneSpring = useSpring({
    r: tone.r,
    g: tone.g,
    b: tone.b,
    a: tone.a,
    config: { tension: 210, friction: 24 },
  });

  const orbitSpring = useSpring({
    opacity: isHovering ? 1 : 0,
    scale: isHovering ? 1 : 0.96,
    config: { tension: 260, friction: 22 },
  });

  const buildFilter = useCallback(
    (r, g, b, a) =>
      getCaliforniaCloudShadowFilterFromTone(size, {
        r,
        g,
        b,
        a,
      }),
    [size],
  );

  const handleCloudMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 0.999);
    const index = Math.min(
      SKY_PRESET_PHASES.length - 1,
      Math.floor(ratio * SKY_PRESET_PHASES.length),
    );

    setPreviewPresetId(SKY_PRESET_PHASES[index].id);
  };

  const lockPreset = (presetId) => {
    setMode('preset');
    setActivePresetId(presetId);
    setPreviewPresetId(null);
  };

  const enableLive = () => {
    setMode('live');
    setPreviewPresetId(null);
  };

  const caption = useMemo(() => {
    if (mode === 'live' && !previewPresetId) {
      return {
        time: `${liveTimeLabel} PT`,
        phase: getCaliforniaSkyPhaseLabel(now),
        status: 'live',
      };
    }

    const presetId = previewPresetId ?? activePresetId;
    const preset = getSkyPresetById(presetId);

    return {
      time: `${formatCaliforniaDecimalHourLabel(preset.hour)} PT`,
      phase: preset.label,
      status: previewPresetId ? 'preview' : 'selected',
    };
  }, [activePresetId, liveTimeLabel, mode, now, previewPresetId]);

  return (
    <div className={`cloud-drop-icon ${className}`.trim()}>
      <div
        className="cloud-drop-icon__interactive"
        style={{ width: interactiveWidth, height: interactiveHeight }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setPreviewPresetId(null);
        }}
      >
        <div
          className="cloud-drop-icon__stage"
          style={{ width: stageWidth, height: stageHeight }}
        >
          <div
            className="cloud-drop-icon__cloud-zone"
            onMouseMove={handleCloudMove}
            onClick={() => {
              if (previewPresetId) {
                lockPreset(previewPresetId);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if (previewPresetId) lockPreset(previewPresetId);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Move across the cloud to preview sky shadows. Click to lock a time of day."
          >
            <animated.img
              src={cloudIcon}
              alt={alt}
              width={size}
              height={height}
              className="cloud-drop-icon__cloud"
              style={{
                width: size,
                height,
                margin: shadowPad,
                objectFit: 'contain',
                filter: to(
                  [toneSpring.r, toneSpring.g, toneSpring.b, toneSpring.a],
                  (r, g, b, a) => buildFilter(r, g, b, a),
                ),
              }}
            />
          </div>

          <animated.div
            className="cloud-drop-icon__orbit"
            style={{
              opacity: orbitSpring.opacity,
              transform: orbitSpring.scale.to((value) => `scale(${value})`),
              pointerEvents: isHovering ? 'auto' : 'none',
            }}
          >
            {SKY_PRESET_PHASES.map((phase, index) => {
              const angle = Math.PI + (index / (SKY_PRESET_PHASES.length - 1)) * Math.PI;
              const x = Math.cos(angle) * orbitRadius;
              const y = Math.sin(angle) * orbitRadius * ORBIT_DEPTH;
              const phaseTone = getCaliforniaSkyShadowToneForHour(phase.hour);
              const phaseColor = getCaliforniaCloudShadowLayers(phaseTone).primary;
              const isActive =
                mode === 'preset' && activePresetId === phase.id && !previewPresetId;
              const isPreview = previewPresetId === phase.id;
              const isLiveMatch = mode === 'live' && !previewPresetId && livePresetId === phase.id;

              return (
                <div
                  key={phase.id}
                  className="cloud-drop-icon__orbit-item"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                >
                  <button
                    type="button"
                    className={[
                      'cloud-drop-icon__phase',
                      isActive ? 'is-active' : '',
                      isPreview ? 'is-preview' : '',
                      isLiveMatch ? 'is-live-match' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{
                      background: isActive ? phaseColor : undefined,
                      border: `1px solid ${phaseColor}`,
                    }}
                    onMouseEnter={() => setPreviewPresetId(phase.id)}
                    onFocus={() => setPreviewPresetId(phase.id)}
                    onClick={(event) => {
                      event.stopPropagation();
                      lockPreset(phase.id);
                    }}
                  >
                    <span className="cloud-drop-icon__phase-label">{phase.label}</span>
                    <span className="cloud-drop-icon__phase-time">
                      {formatCaliforniaDecimalHourLabel(phase.hour)}
                    </span>
                  </button>
                </div>
              );
            })}

            <div className="cloud-drop-icon__live">
              <button
                type="button"
                className={[
                  'cloud-drop-icon__phase',
                  mode === 'live' && !previewPresetId ? 'is-active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ border: `1px solid ${shadowLayers.primary}` }}
                onMouseEnter={() => setPreviewPresetId(null)}
                onFocus={() => setPreviewPresetId(null)}
                onClick={(event) => {
                  event.stopPropagation();
                  enableLive();
                }}
              >
                <span className="cloud-drop-icon__phase-label">Live · California</span>
                <span className="cloud-drop-icon__phase-time">{liveTimeLabel} PT</span>
              </button>
            </div>
          </animated.div>

          {isHovering && (
            <span className="cloud-drop-icon__hint">Move to preview · click to lock</span>
          )}
        </div>
      </div>

      {showSkyCaption && (
        <p className="cloud-drop-icon__caption">
          <strong>{caption.time}</strong> · {caption.phase} · {caption.status}
        </p>
      )}
    </div>
  );
};

export default CloudDropIcon;