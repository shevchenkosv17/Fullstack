import { createContext, useState } from 'react';

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const truck = {
    model: 'Iveco eDaily',
    type: 'Легкий комерційний фургон',
    engine: 'Повністю електричний (Electric)',
    purpose: 'Міська логістика та доставка'
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ truck, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}
