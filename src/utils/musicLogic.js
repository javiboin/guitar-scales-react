export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALES = {
  major: {
    name: 'Mayor (Jónica)',
    intervals: [2, 2, 1, 2, 2, 2, 1],
  },
  minor: {
    name: 'Menor (Eólica)',
    intervals: [2, 1, 2, 2, 1, 2, 2],
  },
  majorPentatonic: {
    name: 'Pentatónica Mayor',
    intervals: [2, 2, 3, 2, 3],
  },
  minorPentatonic: {
    name: 'Pentatónica Menor',
    intervals: [3, 2, 2, 3, 2],
  },
  blues: {
    name: 'Blues',
    intervals: [3, 2, 1, 1, 3, 2],
  },
  dorian: {
    name: 'Dórica',
    intervals: [2, 1, 2, 2, 2, 1, 2],
  },
  phrygian: {
    name: 'Frigia',
    intervals: [1, 2, 2, 2, 1, 2, 2],
  },
  lydian: {
    name: 'Lidia',
    intervals: [2, 2, 2, 1, 2, 2, 1],
  },
  mixolydian: {
    name: 'Mixolidia',
    intervals: [2, 2, 1, 2, 2, 1, 2],
  },
  locrian: {
    name: 'Locria',
    intervals: [1, 2, 2, 1, 2, 2, 2],
  },
};

export const TUNINGS = {
  standard: {
    name: 'Standard (E)',
    notes: ['E', 'B', 'G', 'D', 'A', 'E'],
  },
  standardC: {
    name: 'Standard (C)',
    notes: ['C', 'F', 'A#', 'D#', 'G', 'C'],
  },
  dropD: {
    name: 'Drop D',
    notes: ['E', 'B', 'G', 'D', 'A', 'D'],
  },
  halfStepDown: {
    name: 'Half-step Down (Eb)',
    notes: ['D#', 'A#', 'F#', 'C#', 'G#', 'D#'],
  },
  dadgad: {
    name: 'DADGAD',
    notes: ['D', 'A', 'G', 'D', 'A', 'D'],
  },
  openG: {
    name: 'Open G',
    notes: ['D', 'B', 'G', 'D', 'G', 'D'],
  },
};

/**
 * Retorna las notas de una escala a partir de una tónica y un tipo.
 */
export const getScaleNotes = (root, scaleType) => {
  const scale = SCALES[scaleType];
  if (!scale) return [];

  let currentIndex = NOTES.indexOf(root);
  if (currentIndex === -1) return [];

  const notes = [NOTES[currentIndex]];

  // No recorremos el último intervalo porque vuelve a la octava
  for (let i = 0; i < scale.intervals.length - 1; i++) {
    currentIndex = (currentIndex + scale.intervals[i]) % 12;
    notes.push(NOTES[currentIndex]);
  }

  return notes;
};

/**
 * Mapeo de octavas base para afinación standard (E4, B3, G3, D3, A2, E2)
 */
const BASE_OCTAVES = [4, 3, 3, 3, 2, 2];

/**
 * Retorna el nombre de la nota y su octava en un traste específico de una cuerda.
 */
export const getNoteAt = (stringRoot, fret, stringIndex = 0) => {
  const rootIndex = NOTES.indexOf(stringRoot);
  const totalSemitones = rootIndex + fret;
  const noteName = NOTES[totalSemitones % 12];
  
  // Calculamos la octava. Cada 12 semitonos sube una octava.
  // Usamos el stringIndex para determinar la octava base si está disponible.
  const baseOctave = BASE_OCTAVES[stringIndex] || 3;
  const octave = baseOctave + Math.floor(totalSemitones / 12);
  
  return { noteName, octave, fullNote: `${noteName}${octave}` };
};

/**
 * Calcula todas las posiciones de las notas de la escala en el diapasón.
 */
export const getFretboardNotes = (tuning, totalFrets, scaleNotes) => {
  const positions = [];

  tuning.forEach((stringRoot, stringIndex) => {
    for (let fret = 0; fret <= totalFrets; fret++) {
      const { noteName, fullNote } = getNoteAt(stringRoot, fret, stringIndex);
      if (scaleNotes.includes(noteName)) {
        positions.push({
          string: stringIndex,
          fret,
          label: noteName,
          fullNote, // Útil para el sonido
          isRoot: noteName === scaleNotes[0]
        });
      }
    }
  });

  return positions;
};
