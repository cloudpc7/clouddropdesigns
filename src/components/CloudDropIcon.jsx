import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { animated, to, useSpring } from '@react-spring/web';
import {
  formatCaliforniaDecimalHourLabel,
  getCaliforniaCloudShadowFilterFromTone,
  getCaliforniaCloudShadowLayers,
  getCaliforniaLocalTimeLabel,
  getCaliforniaSkyPhaseLabel,
  getCaliforniaSkyShadowToneNow,
  getSkyToneReadableTextColor,
  getSkyToneSolidBorder,
  getSkyToneSolidColor,
  getSkyPresetById,
  getSkyPresetTone,
  SKY_PRESET_PHASES,
} from '../utils/californiaSkyShadow';
import cloudIcon from '../assets/cloud-icon.png';
import '../styles/components/_cloudDropIcon.scss';

const CLOUD_ASPECT = 413 / 693;
const SHADOW_REFRESH_MS = 60_000;
const ORBIT_RADIUS = 0.52;
const ORBIT_DEPTH = 0.38;

const CloudDropIcon = ({
  size = 96,
  alt = 'CloudDropDesigns logo',
  className = '',
  showSkyCaption = false,
  defaultMode = 'live',
  compact = false,
}) => {
  const [now, setNow] = useState(() => new Date());
  const [mode, setMode] = useState(defaultMode);
  const [activePresetId, setActivePresetId] = useState('dusk');
  const [previewPresetId, setPreviewPresetId] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const isOrbitOpenRef = useRef(false);

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
  const interactiveWidth = compact ? stageWidth : stageWidth + orbitRadius * 2 + 72;
  const interactiveHeight = compact ? stageHeight : stageHeight + controlHeight + 32;
  const liveTimeLabel = getCaliforniaLocalTimeLabel(now);

  const tone = useMemo(() => {
    if (previewPresetId) {
      return getSkyPresetTone(previewPresetId);
    }

    if (mode === 'preset') {
      return getSkyPresetTone(activePresetId);
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

  const openOrbit = useCallback(() => {
    isOrbitOpenRef.current = true;
    setIsHovering(true);
  }, []);

  const closeOrbit = useCallback(() => {
    isOrbitOpenRef.current = false;
    setIsHovering(false);
    setPreviewPresetId(null);
  }, []);

  const lockPreset = (presetId) => {
    isOrbitOpenRef.current = false;
    setMode('preset');
    setActivePresetId(presetId);
    setPreviewPresetId(null);
    setIsHovering(false);
  };

  const enableLive = () => {
    isOrbitOpenRef.current = false;
    setMode('live');
    setPreviewPresetId(null);
    setIsHovering(false);
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
        onMouseEnter={openOrbit}
        onMouseLeave={closeOrbit}
      >
        <div
          className="cloud-drop-icon__stage"
          style={{ width: stageWidth, height: stageHeight }}
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
              const phaseTone = getSkyPresetTone(phase.id);
              const isActive =
                mode === 'preset' && activePresetId === phase.id && !previewPresetId;
              const isPreview = previewPresetId === phase.id;
              const isFilled = isActive;
              const phaseFill = getSkyToneSolidColor(phaseTone);
              const phaseBorder = isFilled
                ? getSkyToneSolidBorder(phaseTone)
                : getCaliforniaCloudShadowLayers(phaseTone).primary;

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
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{
                      background: isFilled ? phaseFill : undefined,
                      border: `1px solid ${phaseBorder}`,
                      '--phase-text': getSkyToneReadableTextColor(phaseTone),
                    }}
                    onMouseEnter={() => {
                      if (isOrbitOpenRef.current) setPreviewPresetId(phase.id);
                    }}
                    onFocus={() => {
                      if (isOrbitOpenRef.current) setPreviewPresetId(phase.id);
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      lockPreset(phase.id);
                      event.currentTarget.blur();
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
                style={{
                  border: `1px solid ${
                    mode === 'live' && !previewPresetId
                      ? getSkyToneSolidBorder(tone)
                      : shadowLayers.primary
                  }`,
                  background:
                    mode === 'live' && !previewPresetId ? getSkyToneSolidColor(tone) : undefined,
                  '--phase-text': getSkyToneReadableTextColor(tone),
                }}
                onMouseEnter={() => {
                  if (isOrbitOpenRef.current) setPreviewPresetId(null);
                }}
                onFocus={() => {
                  if (isOrbitOpenRef.current) setPreviewPresetId(null);
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  enableLive();
                  event.currentTarget.blur();
                }}
              >
                <span className="cloud-drop-icon__phase-label">Live · California</span>
                <span className="cloud-drop-icon__phase-time">{liveTimeLabel} PT</span>
              </button>
            </div>
          </animated.div>

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