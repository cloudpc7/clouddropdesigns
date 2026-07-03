const CALIFORNIA_TIMEZONE = 'America/Los_Angeles';

/** Natural California sky tones only — blues, peach, gold, orange. No purple. */
const SKY_PHASES = [
  { hour: 0, r: 10, g: 25, b: 50, a: 0.45 },
  { hour: 2, r: 22, g: 44, b: 86, a: 0.56 },
  { hour: 5, r: 48, g: 72, b: 112, a: 0.44 },
  { hour: 5.5, r: 115, g: 135, b: 185, a: 0.5 },
  { hour: 6.5, r: 255, g: 180, b: 140, a: 0.45 },
  { hour: 8, r: 255, g: 210, b: 150, a: 0.4 },
  { hour: 10, r: 120, g: 200, b: 255, a: 0.38 },
  { hour: 12, r: 70, g: 170, b: 230, a: 0.32 },
  { hour: 15, r: 90, g: 185, b: 240, a: 0.35 },
  { hour: 17, r: 255, g: 200, b: 120, a: 0.42 },
  { hour: 18.5, r: 255, g: 140, b: 80, a: 0.48 },
  { hour: 20, r: 255, g: 110, b: 70, a: 0.42 },
  { hour: 21.5, r: 40, g: 70, b: 120, a: 0.45 },
  { hour: 24, r: 10, g: 25, b: 50, a: 0.45 },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const lerp = (start, end, t) => start + (end - start) * t;

const toRgba = ({ r, g, b, a }) =>
  `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`;

const getToneRelativeLuminance = ({ r, g, b }) => {
  const normalize = (channel) => {
    const sample = channel / 255;
    return sample <= 0.03928 ? sample / 12.92 : ((sample + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * normalize(r) +
    0.7152 * normalize(g) +
    0.0722 * normalize(b)
  );
};

export const getSkyToneReadableTextColor = (tone) =>
  getToneRelativeLuminance(tone) > 0.5 ? '#141414' : '#f4f2ee';

const toOpaqueRgb = ({ r, g, b }) =>
  `rgb(${Math.round(clamp(r, 0, 255))}, ${Math.round(clamp(g, 0, 255))}, ${Math.round(clamp(b, 0, 255))})`;

export const getSkyToneSolidColor = (tone) => toOpaqueRgb(tone);

export const getSkyToneSolidBorder = (tone) => {
  const luminance = getToneRelativeLuminance(tone);
  const shade = luminance < 0.22 ? 1.12 : 0.8;

  return toOpaqueRgb({
    r: tone.r * shade,
    g: tone.g * shade,
    b: tone.b * shade,
  });
};

export const getCaliforniaDecimalHour = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CALIFORNIA_TIMEZONE,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);

  return hour + minute / 60;
};

export const SKY_PRESET_PHASES = [
  {
    id: 'night',
    label: 'Night',
    hour: 2,
    tone: { r: 22, g: 44, b: 86, a: 0.56 },
  },
  {
    id: 'dawn',
    label: 'Dawn',
    hour: 5.5,
    tone: { r: 115, g: 135, b: 185, a: 0.5 },
  },
  {
    id: 'sunrise',
    label: 'Sunrise',
    hour: 7,
    tone: { r: 255, g: 188, b: 142, a: 0.46 },
  },
  {
    id: 'morning',
    label: 'Morning',
    hour: 9,
    tone: { r: 198, g: 208, b: 168, a: 0.42 },
  },
  {
    id: 'daytime',
    label: 'Daytime',
    hour: 13,
    tone: { r: 82, g: 178, b: 238, a: 0.38 },
  },
  {
    id: 'golden',
    label: 'Golden hour',
    hour: 17.5,
    tone: { r: 255, g: 178, b: 102, a: 0.46 },
  },
  {
    id: 'sunset',
    label: 'Sunset',
    hour: 19,
    tone: { r: 255, g: 128, b: 82, a: 0.48 },
  },
  {
    id: 'dusk',
    label: 'Dusk',
    hour: 20.5,
    tone: { r: 72, g: 98, b: 142, a: 0.46 },
  },
];

const getCaliforniaSkyShadowTone = (date = new Date(), hourOverride = null) => {
  const decimalHour = hourOverride ?? getCaliforniaDecimalHour(date);
  const normalizedHour = decimalHour === 24 ? 0 : decimalHour;

  let startPhase = SKY_PHASES[0];
  let endPhase = SKY_PHASES[SKY_PHASES.length - 1];

  for (let index = 0; index < SKY_PHASES.length - 1; index += 1) {
    const current = SKY_PHASES[index];
    const next = SKY_PHASES[index + 1];

    if (normalizedHour >= current.hour && normalizedHour < next.hour) {
      startPhase = current;
      endPhase = next;
      break;
    }
  }

  const span = endPhase.hour - startPhase.hour || 1;
  const progress = clamp((normalizedHour - startPhase.hour) / span, 0, 1);

  return {
    r: lerp(startPhase.r, endPhase.r, progress),
    g: lerp(startPhase.g, endPhase.g, progress),
    b: lerp(startPhase.b, endPhase.b, progress),
    a: lerp(startPhase.a, endPhase.a, progress),
  };
};

export const getCaliforniaSkyShadowToneForHour = (decimalHour) =>
  getCaliforniaSkyShadowTone(new Date(), decimalHour);

export const getCaliforniaSkyShadowToneNow = (date = new Date()) =>
  getCaliforniaSkyShadowTone(date);

export const getCaliforniaSkyShadowColor = (date = new Date()) =>
  toRgba(getCaliforniaSkyShadowTone(date));

export const getCaliforniaSkyShadowColorForHour = (decimalHour) =>
  toRgba(getCaliforniaSkyShadowToneForHour(decimalHour));

export const getSkyPresetById = (presetId) =>
  SKY_PRESET_PHASES.find((phase) => phase.id === presetId) ?? SKY_PRESET_PHASES[0];

export const getSkyPresetTone = (presetId) => {
  const preset = getSkyPresetById(presetId);

  if (preset.tone) {
    return { ...preset.tone };
  }

  return getCaliforniaSkyShadowToneForHour(preset.hour);
};

const SKY_PHASE_LABELS = [
  { hour: 0, label: 'Night' },
  { hour: 5, label: 'Dawn' },
  { hour: 6.5, label: 'Sunrise' },
  { hour: 8, label: 'Morning' },
  { hour: 10, label: 'Daytime' },
  { hour: 17, label: 'Golden hour' },
  { hour: 18.5, label: 'Sunset' },
  { hour: 20, label: 'Dusk' },
  { hour: 21.5, label: 'Night' },
];

export const getCaliforniaSkyPhaseLabel = (date = new Date()) => {
  const decimalHour = getCaliforniaDecimalHour(date);
  const normalizedHour = decimalHour === 24 ? 0 : decimalHour;

  let label = SKY_PHASE_LABELS[0].label;

  for (let index = 0; index < SKY_PHASE_LABELS.length - 1; index += 1) {
    const current = SKY_PHASE_LABELS[index];
    const next = SKY_PHASE_LABELS[index + 1];

    if (normalizedHour >= current.hour && normalizedHour < next.hour) {
      label = current.label;
      break;
    }
  }

  return label;
};

export const getCaliforniaLocalTimeLabel = (date = new Date()) =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: CALIFORNIA_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);

export const formatCaliforniaDecimalHourLabel = (decimalHour) => {
  const normalizedHour = ((decimalHour % 24) + 24) % 24;
  const hours = Math.floor(normalizedHour);
  const minutes = Math.round((normalizedHour - hours) * 60) % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
};

export const getPresetTimeLabel = (presetId) =>
  formatCaliforniaDecimalHourLabel(getSkyPresetById(presetId).hour);

export const getLivePresetId = (date = new Date()) => {
  const decimalHour = getCaliforniaDecimalHour(date);

  return SKY_PRESET_PHASES.reduce((closest, phase) => {
    const closestDistance = Math.abs(getSkyPresetById(closest).hour - decimalHour);
    const phaseDistance = Math.abs(phase.hour - decimalHour);

    return phaseDistance < closestDistance ? phase.id : closest;
  }, SKY_PRESET_PHASES[0].id);
};

export const getCaliforniaCloudShadowLayers = (tone) => {
  const luminance = getToneRelativeLuminance(tone);
  const isDarkTone = luminance < 0.12;
  const primaryAlphaBoost = isDarkTone ? 0.24 : luminance < 0.22 ? 0.2 : 0.18;
  const deepScale = isDarkTone ? 0.82 : 0.68;

  return {
    primary: toRgba({
      ...tone,
      a: clamp(tone.a + primaryAlphaBoost, 0.42, 0.78),
    }),
    deep: toRgba({
      r: tone.r * deepScale,
      g: tone.g * deepScale,
      b: tone.b * deepScale,
      a: clamp(tone.a + (isDarkTone ? 0.14 : 0.08), 0.34, 0.62),
    }),
    halo: toRgba({
      r: tone.r,
      g: tone.g,
      b: tone.b,
      a: clamp(tone.a + 0.1, 0.22, 0.42),
    }),
  };
};

export const getCaliforniaCloudShadowFilterFromTone = (size = 96, tone) => {
  const { primary, deep } = getCaliforniaCloudShadowLayers(tone);
  const shadowY = Math.max(3, Math.round(size * 0.018));
  const shadowBlur = Math.max(3, Math.round(size * 0.014));

  return [
    `drop-shadow(0 ${shadowY}px ${shadowBlur}px ${primary})`,
    `drop-shadow(0 ${shadowY + 1}px ${shadowBlur + 2}px ${deep})`,
  ].join(' ');
};

export const getCaliforniaCloudShadowFilter = (size = 96, date = new Date()) =>
  getCaliforniaCloudShadowFilterFromTone(size, getCaliforniaSkyShadowTone(date));

export const getCaliforniaCloudShadowFilterForHour = (size = 96, decimalHour) =>
  getCaliforniaCloudShadowFilterFromTone(size, getCaliforniaSkyShadowToneForHour(decimalHour));

export const getSkyShadowFilter = (color) =>
  [
    `drop-shadow(0 0 1px ${color})`,
    `drop-shadow(0 0 2px ${color})`,
    `drop-shadow(0 0 4px ${color})`,
    `drop-shadow(0 2px 3px ${color})`,
  ].join(' ');

const SUNRISE_GLOW = {
  cream: 'rgba(255, 241, 204, 0.72)',
  peach: 'rgba(255, 210, 168, 0.58)',
  apricot: 'rgba(255, 185, 140, 0.46)',
  blush: 'rgba(242, 184, 160, 0.34)',
  sky: 'rgba(158, 184, 216, 0.24)',
};

export function getSunriseGlowFilter(intensity = 1) {
  const scale = intensity.toFixed(2);

  return [
    'brightness(1.04)',
    'saturate(1.05)',
    `drop-shadow(0 0 ${2 * scale}px ${SUNRISE_GLOW.cream})`,
    `drop-shadow(0 0 ${5 * scale}px ${SUNRISE_GLOW.peach})`,
    `drop-shadow(0 0 ${10 * scale}px ${SUNRISE_GLOW.apricot})`,
    `drop-shadow(0 0 ${16 * scale}px ${SUNRISE_GLOW.blush})`,
    `drop-shadow(0 0 ${22 * scale}px ${SUNRISE_GLOW.sky})`,
    `drop-shadow(0 ${3 * scale}px ${6 * scale}px rgba(255, 190, 150, 0.22))`,
  ].join(' ');
}

export function getSunsetGlowFilter(intensity = 1) {
  return getSunriseGlowFilter(intensity);
}

const DAYTIME_GLOW = {
  white: 'rgba(255, 255, 255, 0.75)',
  sky: 'rgba(120, 196, 235, 0.55)',
  blue: 'rgba(74, 163, 216, 0.42)',
  horizon: 'rgba(168, 216, 245, 0.3)',
};

export function getDaytimeGlowFilter(intensity = 1) {
  const scale = intensity.toFixed(2);

  return [
    'brightness(1.06)',
    'saturate(1.02)',
    `drop-shadow(0 0 ${2 * scale}px ${DAYTIME_GLOW.white})`,
    `drop-shadow(0 0 ${6 * scale}px ${DAYTIME_GLOW.sky})`,
    `drop-shadow(0 0 ${12 * scale}px ${DAYTIME_GLOW.blue})`,
    `drop-shadow(0 0 ${20 * scale}px ${DAYTIME_GLOW.horizon})`,
    `drop-shadow(0 ${3 * scale}px ${6 * scale}px rgba(74, 163, 216, 0.18))`,
  ].join(' ');
}

export function getCloudBlackShadowFilter(intensity = 1) {
  const scale = intensity.toFixed(2);

  return [
    `drop-shadow(0 ${1 * scale}px ${2 * scale}px rgba(0, 0, 0, 0.28))`,
    `drop-shadow(0 ${3 * scale}px ${6 * scale}px rgba(0, 0, 0, 0.22))`,
    `drop-shadow(0 ${6 * scale}px ${14 * scale}px rgba(0, 0, 0, 0.16))`,
  ].join(' ');
}

