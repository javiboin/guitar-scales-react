import { Box, styled } from '@mui/material';

const NeckContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  backgroundColor: '#3d2b1f', // Color madera oscura
  borderRadius: theme.shape.borderRadius,
  padding: '20px 0',
  position: 'relative',
  boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)',
  userSelect: 'none',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '4px',
  },
}));

const Fretboard = styled(Box)(({ frets = 22 }) => ({
  display: 'grid',
  gridTemplateColumns: `40px repeat(${frets}, 1fr)`,
  minWidth: `${frets * 50 + 40}px`,
  height: '180px',
  position: 'relative',
}));

const StringLine = styled(Box)(({ top }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: `${top}%`,
  height: '2px',
  background: 'linear-gradient(to bottom, #bdc3c7, #2c3e50)',
  boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
  zIndex: 1,
}));

const FretLine = styled(Box)(({ isNut }) => ({
  gridRow: '1 / -1',
  borderLeft: isNut ? '8px solid #ecf0f1' : '3px solid #95a5a6',
  height: '100%',
  position: 'relative',
  zIndex: 2,
}));

const NoteMarker = styled(Box)(({ theme, color = 'primary.main' }) => ({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: color === 'primary.main' ? theme.palette.primary.main : color,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 3,
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
}));

const FretMarker = styled(Box)(({ theme }) => ({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.2)',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
}));

const GuitarNeck = ({ 
  frets = 15, 
  tuning = ['E', 'B', 'G', 'D', 'A', 'E'],
  selectedNotes = [] // [{ string: 0, fret: 5, label: 'A' }]
}) => {
  const strings = [0, 1, 2, 3, 4, 5]; // 0 es la más fina (E alta)

  const isMarkerFret = (f) => [3, 5, 7, 9, 12, 15, 17, 19, 21].includes(f);

  return (
    <NeckContainer>
      <Fretboard frets={frets}>
        {/* Nut and Frets */}
        {[...Array(frets + 1)].map((_, i) => (
          <FretLine key={i} isNut={i === 0}>
            {isMarkerFret(i) && <FretMarker />}
            {i === 12 && (
              <>
                <FretMarker sx={{ top: '25%' }} />
                <FretMarker sx={{ top: '75%' }} />
              </>
            )}
          </FretLine>
        ))}

        {/* Strings */}
        {strings.map((s, i) => (
          <StringLine key={s} top={(i + 1) * (100 / (strings.length + 1))} />
        ))}

        {/* Selected Notes */}
        {selectedNotes.map((note, i) => (
          <NoteMarker
            key={i}
            sx={{
              left: `${(note.fret * (100 / (frets + 1))) + (50 / (frets + 1))}%`,
              top: `${(note.string + 1) * (100 / (strings.length + 1))}%`,
            }}
          >
            {note.label}
          </NoteMarker>
        ))}
      </Fretboard>
    </NeckContainer>
  );
};

export default GuitarNeck;
