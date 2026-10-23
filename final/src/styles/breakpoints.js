export const BREAKPOINT_VALUES = Object.freeze({
  desktop: 1600,
  tablet: 1280,
  phone: 768,
});

export const BREAKPOINTS = Object.freeze({
  desktop: `${BREAKPOINT_VALUES.desktop}px`,
  tablet: `${BREAKPOINT_VALUES.tablet}px`,
  phone: `${BREAKPOINT_VALUES.phone}px`,
});

export const MEDIA_QUERIES = Object.freeze({
  desktop: `(max-width: ${BREAKPOINTS.desktop})`,
  tablet: `(max-width: ${BREAKPOINTS.tablet})`,
  phone: `(max-width: ${BREAKPOINTS.phone})`,
});
