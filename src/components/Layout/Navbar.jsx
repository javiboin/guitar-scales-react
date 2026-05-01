import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: '#121212', borderBottom: '1px solid rgba(255,140,0,0.2)' }} elevation={0}>
      <Toolbar>
        <MusicNoteIcon sx={{ mr: 2, color: '#FF8C00' }} />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer', 
            fontWeight: '800', 
            color: '#FF8C00',
            fontFamily: '"Outfit", sans-serif'
          }}
          onClick={() => navigate('/')}
        >
          GuitarScales
        </Typography>
        <Box>
          <Button sx={{ color: '#FF8C00', fontWeight: '600' }} onClick={() => navigate('/')}>Inicio</Button>
          <Button sx={{ color: 'text.primary' }} onClick={() => navigate('/visualizer')}>Explorar</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
