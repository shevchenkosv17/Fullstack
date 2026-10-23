import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Provider as StoreProvider } from 'react-redux';

import { store } from './store';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <StoreProvider store={store}>
          <RouterProvider router={router} />
        </StoreProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
