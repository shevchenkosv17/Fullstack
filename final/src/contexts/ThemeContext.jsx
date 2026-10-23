import { createContext, useContext, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';

import { createMuiAppTheme, getThemeColors } from '../styles/theme';

const ThemeContext = createContext();
const THEME_STORAGE_KEY = 'theme';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    return storedTheme === 'night' ? 'night' : 'day';
  });

  const muiTheme = useMemo(() => createMuiAppTheme(theme), [theme]);
  const colors = useMemo(() => getThemeColors(theme), [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'day' ? 'night' : 'day';
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

      return nextTheme;
    });
  };

  const value = useMemo(
    () => ({
      theme,
      colors,
      toggleTheme,
    }),
    [theme, colors],
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
