import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visualizer from './Visualizer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#0a0a0a'
    }}>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: '2rem',
          paddingBottom: '2rem'
        }}>

        <Typography variant="h2" component="h1" fontWeight="800"
          sx={{
            background: 'linear-gradient(45deg, #FF8C00 30%, #FFD700 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: '"Outfit", sans-serif',
            textShadow: '0 0 30px rgba(255, 140, 0, 0.2)'
          }}>
          Guitar Scale Visualizer
        </Typography>

        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px', lineHeight: 1.2 }}>
          Domina el diapasón con nuestra herramienta interactiva. Visualiza escalas en tiempo real, escucha cada nota y perfecciona tu teoría musical.
        </Typography>

        <Visualizer />

      </Container>
    </Box>
  );
};

export default Home;
