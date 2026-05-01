import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Visualizer from './pages/Visualizer';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4caf50', // Verde vibrante para notas de la escala
    },
    secondary: {
      main: '#f44336', // Rojo para la tónica
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#b0b0b0',
    }
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 800,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<Visualizer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
