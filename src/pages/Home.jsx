import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 4,
            p: 6,
            borderRadius: 8,
            background: 'rgba(20, 20, 20, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 140, 0, 0.1)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
          }}
        >
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
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '600px', lineHeight: 1.6 }}>
            Domina el diapasón con nuestra herramienta interactiva. Visualiza escalas en tiempo real, escucha cada nota y perfecciona tu teoría musical.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/visualizer')}
            sx={{ 
              px: 6, 
              py: 2, 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              borderRadius: 4,
              textTransform: 'none',
              background: 'linear-gradient(45deg, #FF8C00 30%, #FFA500 90%)',
              boxShadow: '0 10px 20px rgba(255, 140, 0, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 25px rgba(255, 140, 0, 0.4)',
              }
            }}
          >
            Empezar a Explorar
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
