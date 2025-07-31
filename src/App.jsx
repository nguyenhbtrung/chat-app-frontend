import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProviderContext, ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ToastContainer } from 'react-toastify';

function AppContent() {
  const { theme, toggleTheme, mode } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ padding: 16 }}>
        {/* <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton> */}

        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeProviderContext>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProviderContext>
  );
}

export default App;
