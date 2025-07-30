import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let baseTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            contrastText: '#fff',
        },
        secondary: {
            main: '#7b1fa2',
            contrastText: '#fff',
        },
        error: {
            main: '#d32f2f',
        },
        warning: {
            main: '#f57c00',
        },
        info: {
            main: '#0288d1',
        },
        success: {
            main: '#2e7d32',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#555',
        },
    },

    spacing: 8, // spacing unit (8px, 16px...)

    typography: {
        fontFamily: ['"Poppins"', '"Roboto"', 'sans-serif'].join(','),
        h1: { fontSize: '3rem', fontWeight: 600 },
        h2: { fontSize: '2.25rem', fontWeight: 600 },
        h3: { fontSize: '1.75rem', fontWeight: 500 },
        h4: { fontSize: '1.5rem', fontWeight: 500 },
        h5: { fontSize: '1.25rem', fontWeight: 500 },
        h6: { fontSize: '1rem', fontWeight: 500 },
        subtitle1: { fontSize: '1rem' },
        subtitle2: { fontSize: '0.875rem' },
        body1: { fontSize: '1rem' },
        body2: { fontSize: '0.875rem' },
        button: { textTransform: 'none', fontWeight: 500 },
        caption: { fontSize: '0.75rem' },
        overline: { fontSize: '0.75rem', textTransform: 'uppercase' },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    padding: '8px 16px',
                },
                containedPrimary: {
                    boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#1976d2',
                },
            },
        },
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },

    zIndex: {
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        callOverlay: 1400, // custom layer for video call
    },

    custom: {
        chatBubble: {
            user: '#1976d2',
            peer: '#eeeeee',
        },
        callPanel: {
            background: '#1e1e1e',
        },
    },
});

const lightTheme = responsiveFontSizes(baseTheme);

const darkTheme = responsiveFontSizes(
    createTheme({
        ...baseTheme,
        palette: {
            ...baseTheme.palette,
            mode: 'dark',
            background: {
                default: '#121212',
                paper: '#1e1e1e',
            },
            text: {
                primary: '#ffffff',
                secondary: '#cccccc',
            },
        },
    })
);

export { lightTheme, darkTheme };
