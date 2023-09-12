import { createContext } from 'react';

export const ThemeContext = createContext({
  toggleTheme: () => {},
  themeText: 'light',
  setLoading: () => {},
  showModalResult: () => {},
  setMessageModalResult: () => {},
  setTitleModalResult: () => {},
  setStatusModalResult: () => {},
  onLogout: () => {},
});
