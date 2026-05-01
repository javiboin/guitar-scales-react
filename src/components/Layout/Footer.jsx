import { Box, Typography, Container, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        bgcolor: '#0a0a0a',
        borderTop: '1px solid rgba(255, 140, 0, 0.1)',
        color: 'text.secondary'
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ fontFamily: '"Outfit", sans-serif' }}>
            © {new Date().getFullYear()} <span style={{ color: '#FF8C00', fontWeight: 'bold' }}>GuitarScales</span>. Hecho para músicos.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              component="a"
              href="https://github.com/javiboin"
              target="_blank"
              sx={{ color: 'rgba(255,140,0,0.6)', '&:hover': { color: '#FF8C00' } }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component="a"
              href="https://www.linkedin.com/in/javier-alejandro-oyarzo-7110aa138/"
              target="_blank"
              sx={{ color: 'rgba(255,140,0,0.6)', '&:hover': { color: '#FF8C00' } }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
