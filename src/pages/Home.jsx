import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          mt: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
          gap: 4
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold" color="primary">
          Guitar Scale Visualizer
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Explora escalas musicales de forma interactiva con el mástil de guitarra, teclado de piano y diagramas técnicos.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate('/visualizer')}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Empezar a Explorar
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
