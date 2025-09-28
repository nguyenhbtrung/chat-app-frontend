import { createContext, useState, useMemo } from 'react';
import { lightTheme, darkTheme } from '../theme/theme';
import { THEMES } from '../constants';

export const ThemeContext = createContext();

export const ThemeProviderContext = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem('theme') || THEMES.LIGHT);
    const toggleTheme = () => setMode((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
    const saveMode = (mode) => {
        setMode(mode);
        localStorage.setItem('theme', mode);
    };

    const theme = useMemo(() => (mode === THEMES.LIGHT ? lightTheme : darkTheme), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme, theme, saveMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
