import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import GuitarNeck from '../components/Guitar/GuitarNeck';

const Visualizer = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Explorador de Escalas
      </Typography>
      
      <Grid container spacing={3}>
        {/* Selector de Escalas y Tonalidad */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">Configuración de Escala</Typography>
            <Box sx={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.disabled' }}>
              Selectores de Tónica y Tipo de Escala (Próximamente)
            </Box>
          </Paper>
        </Grid>

        {/* Neck de Guitarra */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, minHeight: 200, overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom>Mástil de Guitarra</Typography>
            <GuitarNeck 
              selectedNotes={[
                { string: 0, fret: 5, label: 'A' },
                { string: 1, fret: 5, label: 'E' },
                { string: 2, fret: 5, label: 'C' },
                { string: 3, fret: 5, label: 'G' },
              ]}
            />
          </Paper>
        </Grid>

        {/* Teclado de Piano */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, minHeight: 150 }}>
            <Typography variant="h6" gutterBottom>Teclado de Piano</Typography>
            <Box sx={{ height: 100, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              [ Componente PianoKeys ]
            </Box>
          </Paper>
        </Grid>

        {/* Diagrama de Escala */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, minHeight: 150 }}>
            <Typography variant="h6" gutterBottom>Diagrama de Escala</Typography>
            <Box sx={{ height: 100, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              [ Componente ScaleDiagram ]
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Visualizer;
