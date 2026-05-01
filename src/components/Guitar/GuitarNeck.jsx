import { Box, styled } from '@mui/material';

const NeckContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  background: 'linear-gradient(90deg, #3d2b1f 0%, #4e3629 50%, #3d2b1f 100%)', // Gradiente de madera premium
  borderRadius: theme.shape.borderRadius,
  padding: '15px 0',
  position: 'relative',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 0 100px rgba(0,0,0,0.4)',
  userSelect: 'none',
  display: 'block',
  margin: '20px 0',
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
  width: '100%',
  minWidth: `${frets * 40 + 40}px`,
  height: '180px',
  position: 'relative',
}));

const StringLine = styled(Box)(({ top }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: `${top}%`,
  height: '2px',
  background: 'linear-gradient(to bottom, #dcdde1, #7f8c8d)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
  zIndex: 1,
}));

const FretLine = styled(Box)(({ isNut }) => ({
  gridRow: '1 / -1',
  borderLeft: isNut ? '8px solid #f1f2f6' : '2px solid #a4b0be',
  height: '200%',
  position: 'relative',
  zIndex: 2,
  opacity: 0.8,
}));

const NoteMarker = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isRoot',
})(({ theme, isRoot }) => ({
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  backgroundColor: isRoot ? theme.palette.secondary.main : theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.7rem',
  fontWeight: 'bold',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 10,
  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
  border: isRoot ? '2px solid white' : '1px solid rgba(255,255,255,0.3)',
  opacity: 0.85,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1.25)',
    boxShadow: `0 0 15px ${isRoot ? theme.palette.secondary.main : theme.palette.primary.main}`,
    zIndex: 11,
  },
}));

const FretMarker = styled(Box)(({ theme }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.15)',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 0,
  boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)',
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
        {strings.map((s, i) => {
          const topPosition = 10 + i * (80 / (strings.length - 1));
          return (
            <Box key={s}>
              <StringLine top={topPosition} />
              <Box
                sx={{
                  position: 'absolute',
                  left: '10px',
                  top: `${topPosition}%`,
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  zIndex: 4
                }}
              >
                {tuning[s]}
              </Box>
            </Box>
          );
        })}

        {/* Selected Notes */}
        {selectedNotes.map((note, i) => (
          <NoteMarker
            key={i}
            isRoot={note.isRoot}
            sx={{
              left: `${(note.fret * (100 / (frets + 1))) + (50 / (frets + 1))}%`,
              top: `${10 + note.string * (80 / (strings.length - 1))}%`,
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
