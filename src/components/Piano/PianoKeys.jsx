import { Box, styled, Typography } from '@mui/material';

const PianoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  padding: '10px 0',
  position: 'relative',
  userSelect: 'none',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '4px',
  },
}));

const KeysWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  height: '160px',
  backgroundColor: '#000',
  padding: '2px',
  borderRadius: theme.shape.borderRadius,
  width: 'fit-content',
  margin: '0 auto',
}));

const WhiteKey = styled(Box, {
  shouldForwardProp: (prop) => !['isActive', 'isRoot'].includes(prop),
})(({ theme, isActive, isRoot }) => ({
  width: '45px',
  height: '100%',
  backgroundColor: isRoot ? theme.palette.secondary.light : (isActive ? theme.palette.primary.light : '#fff'),
  border: '1px solid #ccc',
  borderRadius: '0 0 4px 4px',
  zIndex: 1,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  paddingBottom: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
  ...(isRoot && {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  }),
  ...(isActive && !isRoot && {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  }),
}));

const BlackKey = styled(Box, {
  shouldForwardProp: (prop) => !['isActive', 'isRoot'].includes(prop),
})(({ theme, isActive, isRoot }) => ({
  width: '30px',
  height: '60%',
  backgroundColor: isRoot ? theme.palette.secondary.main : (isActive ? theme.palette.primary.main : '#333'),
  borderRadius: '0 0 3px 3px',
  zIndex: 2,
  position: 'absolute',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  paddingBottom: '5px',
  color: '#fff',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
  border: isRoot ? '2px solid white' : 'none',
}));

const PianoKeys = ({ selectedNotes = [] }) => {
  const baseNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octaves = 2;
  
  // Generamos todas las teclas para las octavas deseadas
  const allKeys = [];
  for (let o = 0; o < octaves; o++) {
    baseNotes.forEach(note => {
      allKeys.push({
        note,
        isBlack: note.includes('#'),
        isActive: selectedNotes.includes(note),
        isRoot: selectedNotes[0] === note
      });
    });
  }

  // Para el renderizado, separamos blancas de negras
  // Pero necesitamos saber la posición X de las negras basada en las blancas
  let whiteKeyCount = 0;
  
  return (
    <PianoContainer>
      <KeysWrapper>
        {allKeys.map((key, index) => {
          if (!key.isBlack) {
            const currentWhiteIndex = whiteKeyCount++;
            return (
              <WhiteKey 
                key={index} 
                isActive={key.isActive} 
                isRoot={key.isRoot}
              >
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                  {key.note}
                </Typography>
              </WhiteKey>
            );
          }
          return null;
        })}

        {/* Renderizamos las teclas negras encima */}
        {(() => {
          let wCount = 0;
          return allKeys.map((key, index) => {
            if (!key.isBlack) {
              wCount++;
              return null;
            }
            
            // Posición de la tecla negra: entre la tecla blanca actual y la siguiente
            // Excepto después de E y B
            const leftPos = wCount * 45;
            
            return (
              <BlackKey 
                key={index} 
                style={{ left: `${leftPos}px` }}
                isActive={key.isActive}
                isRoot={key.isRoot}
              >
                <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
                  {key.note}
                </Typography>
              </BlackKey>
            );
          });
        })()}
      </KeysWrapper>
    </PianoContainer>
  );
};

export default PianoKeys;
