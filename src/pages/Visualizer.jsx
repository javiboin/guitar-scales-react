import { useState, useMemo } from 'react';
import { Box, Typography, Container, Paper, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import GuitarNeck from '../components/Guitar/GuitarNeck';
import PianoKeys from '../components/Piano/PianoKeys';
import { NOTES, SCALES, TUNINGS, getScaleNotes, getFretboardNotes } from '../utils/musicLogic';

const Visualizer = () => {
  const [root, setRoot] = useState('C');
  const [scaleType, setScaleType] = useState('major');
  const [tuningKey, setTuningKey] = useState('standard');
  const [totalFrets] = useState(15);

  const tuning = useMemo(() => TUNINGS[tuningKey].notes, [tuningKey]);
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
        {/* Selector de Escalas y Afinación */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 100 }}>
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

            <FormControl sx={{ minWidth: 180 }}>
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

            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Afinación</InputLabel>
              <Select
                value={tuningKey}
                label="Afinación"
                onChange={(e) => setTuningKey(e.target.value)}
              >
                {Object.entries(TUNINGS).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ ml: { md: 'auto' }, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Mástil de Guitarra</Typography>
              <Typography variant="body2" color="text.secondary">
                Afinación: {TUNINGS[tuningKey].notes.join(' - ')}
              </Typography>
            </Box>
            <GuitarNeck
              frets={totalFrets}
              tuning={tuning}
              selectedNotes={fretboardNotes}
            />
          </Paper>
        </Grid>

        {/* Teclado de Piano */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, minHeight: 150 }}>
            <Typography variant="h6" gutterBottom>Teclado de Piano</Typography>
            <PianoKeys selectedNotes={scaleNotes} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Visualizer;
