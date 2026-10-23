import { createTheme } from '@mui/material/styles';
import { BREAKPOINT_VALUES } from './breakpoints';

export const COLORS = {
  day: {
    appBackground: '#f8fafc',
    surface: '#ffffff',
    surfaceAlt: '#f1f5f9',
    border: '#cbd5e1',
    borderStrong: '#94a3b8',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    accent: '#2563eb',
    accentSoft: '#dbeafe',
    success: '#166534',
    error: '#b91c1c',
  },
  night: {
    appBackground: '#111827',
    surface: '#111827',
    surfaceAlt: '#1e293b',
    border: '#334155',
    borderStrong: '#475569',
    textPrimary: '#e2e8f0',
    textSecondary: '#94a3b8',
    accent: '#60a5fa',
    accentSoft: '#1e3a8a',
    success: '#22c55e',
    error: '#f87171',
  },
};

export const getThemeColors = (mode) => COLORS[mode] ?? COLORS.day;

export const createMuiAppTheme = (mode) => {
  const colors = getThemeColors(mode);
  const paletteMode = mode === 'night' ? 'dark' : 'light';

  return createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: BREAKPOINT_VALUES.phone,
        md: BREAKPOINT_VALUES.tablet,
        lg: BREAKPOINT_VALUES.desktop,
        xl: 1920,
      },
    },
    palette: {
      mode: paletteMode,
      primary: {
        main: colors.accent,
      },
      background: {
        default: colors.appBackground,
        paper: colors.surface,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
      divider: colors.border,
      error: {
        main: colors.error,
      },
      success: {
        main: colors.success,
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: colors.appBackground,

            color: colors.textPrimary,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            boxShadow: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          outlined: {
            borderColor: colors.border,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface,
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            border: `1px solid ${colors.border}`,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });
};
