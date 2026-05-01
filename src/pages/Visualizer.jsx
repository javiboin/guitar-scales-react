import { useState, useMemo, useCallback } from 'react';
import { Box, Typography, Container, Paper, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import GuitarNeck from '../components/Guitar/GuitarNeck';
import PianoKeys from '../components/Piano/PianoKeys';
import { NOTES, SCALES, TUNINGS, getScaleNotes, getFretboardNotes } from '../utils/musicLogic';
import * as Tone from 'tone';

const Visualizer = () => {
  const [root, setRoot] = useState('C');
  const [scaleType, setScaleType] = useState('major');
  const [tuningKey, setTuningKey] = useState('standard');

  // Inicializar sintetizador
  const synth = useMemo(() => new Tone.PolySynth(Tone.Synth).toDestination(), []);

  const playNote = useCallback(async (note) => {
    await Tone.start(); // Necesario para desbloquear el audio en navegadores
    synth.triggerAttackRelease(note, "8n");
  }, [synth]);
  const [totalFrets] = useState(15);

  const tuning = useMemo(() => TUNINGS[tuningKey].notes, [tuningKey]);
  const scaleNotes = useMemo(() => getScaleNotes(root, scaleType), [root, scaleType]);
  const fretboardNotes = useMemo(() =>
    getFretboardNotes(tuning, totalFrets, scaleNotes),
    [tuning, totalFrets, scaleNotes]
  );

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)', // Restamos la altura de la Navbar
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      py: 4
    }}>
      <Container maxWidth="xl">
        <Typography variant="h3" gutterBottom fontWeight="800" align="center"
          sx={{
            mb: 6,
            background: 'linear-gradient(45deg, #FF8C00 30%, #FFD700 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(255, 140, 0, 0.3)'
          }}>
          Guitar Scale Explorer
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* Selector de Escalas y Afinación */}
          <Grid item xs={12}>
            <Paper elevation={8} sx={{
              p: 3,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              flexWrap: 'wrap',
              borderRadius: 4,
              background: 'rgba(30, 30, 30, 0.8)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
            }}>
              <FormControl variant="outlined" sx={{ minWidth: 140 }}>
                <InputLabel sx={{ color: '#FF8C00' }}>Tónica</InputLabel>
                <Select
                  value={root}
                  label="Tónica"
                  onChange={(e) => setRoot(e.target.value)}
                  sx={{ borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,140,0,0.3)' } }}
                >
                  {NOTES.map((n) => (
                    <MenuItem key={n} value={n}>{n}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ color: '#FF8C00' }}>Escala</InputLabel>
                <Select
                  value={scaleType}
                  label="Escala"
                  onChange={(e) => setScaleType(e.target.value)}
                  sx={{ borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,140,0,0.3)' } }}
                >
                  {Object.entries(SCALES).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ color: '#FF8C00' }}>Afinación</InputLabel>
                <Select
                  value={tuningKey}
                  label="Afinación"
                  onChange={(e) => setTuningKey(e.target.value)}
                  sx={{ borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,140,0,0.3)' } }}
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
                    elevation={4}
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: i === 0 ? 'secondary.main' : 'primary.main',
                      color: 'white',
                      borderRadius: 2,
                      fontWeight: '800',
                      boxShadow: i === 0 ? '0 0 15px rgba(244, 67, 54, 0.6)' : '0 0 10px rgba(76, 175, 80, 0.2)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: i === 0 ? '0 5px 20px rgba(244, 67, 54, 0.8)' : '0 5px 15px rgba(76, 175, 80, 0.6)'
                      }
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
            <Paper elevation={12} sx={{
              p: 4,
              borderRadius: 4,
              overflow: 'hidden',
              background: '#121212',
              border: '1px solid rgba(255, 140, 0, 0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="700" sx={{ color: '#FF8C00', textShadow: '0 0 10px rgba(255,140,0,0.3)' }}>Mástil de Guitarra</Typography>
                <Box sx={{ px: 2, py: 0.5, bgcolor: 'rgba(255,140,0,0.1)', borderRadius: 10, border: '1px solid rgba(255,140,0,0.2)' }}>
                  <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#FF8C00' }}>
                    Afinación: {TUNINGS[tuningKey].notes.join(' - ')}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'block', width: '100%' }}>
                <GuitarNeck
                  frets={totalFrets}
                  tuning={tuning}
                  selectedNotes={fretboardNotes}
                  onNoteClick={playNote}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Teclado de Piano */}
          <Grid item xs={12}>
            <Paper elevation={12} sx={{
              p: 4,
              borderRadius: 4,
              background: '#121212',
              border: '1px solid rgba(255, 140, 0, 0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}>
              <Typography variant="h5" fontWeight="700" sx={{ color: '#FF8C00', mb: 3, textShadow: '0 0 10px rgba(255,140,0,0.3)' }} gutterBottom>Teclado de Piano</Typography>
              <Box sx={{ display: 'block', width: '100%' }}>
                <PianoKeys selectedNotes={scaleNotes} onNoteClick={playNote} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Visualizer;
