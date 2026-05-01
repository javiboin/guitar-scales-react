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
      <Typography variant="h3" gutterBottom fontWeight="800" align="center" sx={{ mb: 6, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Guitar Scale Explorer
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Selector de Escalas y Afinación */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap', borderRadius: 4, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
            <FormControl variant="outlined" sx={{ minWidth: 140 }}>
              <InputLabel>Tónica</InputLabel>
              <Select
                value={root}
                label="Tónica"
                onChange={(e) => setRoot(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {NOTES.map((n) => (
                  <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Escala</InputLabel>
              <Select
                value={scaleType}
                label="Escala"
                onChange={(e) => setScaleType(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {Object.entries(SCALES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Afinación</InputLabel>
              <Select
                value={tuningKey}
                label="Afinación"
                onChange={(e) => setTuningKey(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {Object.entries(TUNINGS).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ ml: { md: 'auto' }, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {scaleNotes.map((note, i) => (
                <Paper
                  key={i}
                  elevation={2}
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: i === 0 ? 'secondary.main' : 'primary.main',
                    color: 'white',
                    borderRadius: 2,
                    fontWeight: '800',
                    boxShadow: i === 0 ? '0 0 15px rgba(233, 30, 99, 0.4)' : 'none',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-3px)' }
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
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, overflow: 'hidden', background: '#f5f6fa' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="700" color="primary">Mástil de Guitarra</Typography>
              <Box sx={{ px: 2, py: 0.5, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 10 }}>
                <Typography variant="subtitle2" fontWeight="600" color="text.secondary">
                  Afinación: {TUNINGS[tuningKey].notes.join(' - ')}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'block', width: '100%' }}>
              <GuitarNeck
                frets={totalFrets}
                tuning={tuning}
                selectedNotes={fretboardNotes}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Teclado de Piano */}
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#f5f6fa' }}>
            <Typography variant="h5" fontWeight="700" color="primary" gutterBottom sx={{ mb: 3 }}>Teclado de Piano</Typography>
            <Box sx={{ display: 'block', width: '100%' }}>
              <PianoKeys selectedNotes={scaleNotes} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Visualizer;

