import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <MusicNoteIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => navigate('/')}
        >
          GuitarScales
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>Inicio</Button>
          <Button color="inherit" onClick={() => navigate('/visualizer')}>Explorar</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
