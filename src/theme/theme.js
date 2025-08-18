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
            light: '#ef5350',
            dark: '#b71c1c',
            contrastText: '#fff',
            background: '#fdecea',
            onBackground: '#d32f2f'
        },
        warning: {
            main: '#f57c00',
        },
        info: {
            main: '#0288d1',
        },
        success: {
            main: '#2e7d32',
            light: '#4caf50',
            dark: '#1b5e20',
            contrastText: '#fff',
            background: '#e8f5e9',
            onBackground: '#2e7d32'
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#555',
            tertiary: '#888',
            disabled: '#aaa',
        },
        logo: {
            main: '#ffffffff',
            background: '#1976d2',
            text: '#1976d2',
        },
        input: {
            background: '#f5f5f5',
        },
        chat: {
            background: '#f9f9f9',
            chip: '#ffffff',
            bubble: {
                user: '#2196f3',
                peer: '#e0e0e0',
            },
        },
        status: {
            online: '#44b700',
            offline: '#9e9e9e',
            away: '#ffb300',
            busy: '#d32f2f',
        },
        navigation: {
            selected: '#e0e0e0',
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
        MuiTab: {
            styleOverrides: {
                root: {
                    '&:focus': { outline: 'none' },
                    '&.Mui-focusVisible': { outline: 'none' }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: 'none',
                    },
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
            success: {
                main: '#4caf50',
                light: '#66bb6a',
                dark: '#388e3c',
                contrastText: '#fff',
                background: '#1b3c29',
                onBackground: '#81c784'
            },
            error: {
                main: '#ef5350',
                light: '#e57373',
                dark: '#c62828',
                contrastText: '#fff',
                background: '#3b1818',
                onBackground: '#ef9a9a'
            },
            background: {
                default: '#121212',
                paper: '#1e1e1e',
            },
            text: {
                primary: '#ffffff',
                secondary: '#cccccc',
                tertiary: '#999999',
                disabled: '#666666',
            },
            logo: {
                main: '#1976d2',
                background: '#ffffffff',
                text: '#1976d2'
            },
            input: {
                background: '#424242',
            },
            chat: {
                background: '#1e1e1e',
                chip: '#323232',
                bubble: {
                    user: '#1976d2',
                    peer: '#424242',
                },
            },
            status: {
                online: '#44b700',
                offline: '#9e9e9e',
                away: '#ffca28',
                busy: '#ef5350',
            },
            navigation: {
                selected: '#484848',
            },
        },
    })
);

export { lightTheme, darkTheme };
