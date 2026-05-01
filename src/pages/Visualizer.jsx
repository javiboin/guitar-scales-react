import { useState, useMemo } from 'react';
import { Box, Typography, Container, Paper, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import GuitarNeck from '../components/Guitar/GuitarNeck';
import PianoKeys from '../components/Piano/PianoKeys';
import { NOTES, SCALES, getScaleNotes, getFretboardNotes } from '../utils/musicLogic';

const Visualizer = () => {
  const [root, setRoot] = useState('C');
  const [scaleType, setScaleType] = useState('major');
  const [tuning] = useState(['E', 'B', 'G', 'D', 'A', 'E']);
  const [totalFrets] = useState(15);

  const scaleNotes = useMemo(() => getScaleNotes(root, scaleType), [root, scaleType]);
  const fretboardNotes = useMemo(() => 
    getFretboardNotes(tuning, totalFrets, scaleNotes), 
    [tuning, totalFrets, scaleNotes]
  );
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Explorador de Escalas
      </Typography>
      
      <Grid container spacing={3}>
        {/* Selector de Escalas y Tonalidad */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Tónica</InputLabel>
              <Select
                value={root}
                label="Tónica"
                onChange={(e) => setRoot(e.target.value)}
              >
                {NOTES.map((n) => (
                  <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Escala</InputLabel>
              <Select
                value={scaleType}
                label="Escala"
                onChange={(e) => setScaleType(e.target.value)}
              >
                {Object.entries(SCALES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
              {scaleNotes.map((note, i) => (
                <Paper 
                  key={i} 
                  elevation={0} 
                  sx={{ 
                    px: 1.5, 
                    py: 0.5, 
                    bgcolor: i === 0 ? 'secondary.main' : 'primary.main', 
                    color: 'white',
                    borderRadius: 1,
                    fontWeight: 'bold'
                  }}
                >
                  {note}
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Neck de Guitarra */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, minHeight: 200, overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom>Mástil de Guitarra</Typography>
            <GuitarNeck 
              frets={totalFrets}
              selectedNotes={fretboardNotes}
            />
          </Paper>
        </Grid>

        {/* Teclado de Piano */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, minHeight: 150 }}>
            <Typography variant="h6" gutterBottom>Teclado de Piano</Typography>
            <PianoKeys selectedNotes={scaleNotes} />
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
