import { createContext, useState, useMemo } from 'react';
import { lightTheme, darkTheme } from '../theme/theme';

export const ThemeContext = createContext();

export const ThemeProviderContext = ({ children }) => {
    const [mode, setMode] = useState('light');
    const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};
