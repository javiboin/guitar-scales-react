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
 * Retorna el nombre de la nota en un traste específico de una cuerda.
 */
export const getNoteAt = (stringRoot, fret) => {
  const rootIndex = NOTES.indexOf(stringRoot);
  return NOTES[(rootIndex + fret) % 12];
};

/**
 * Calcula todas las posiciones de las notas de la escala en el diapasón.
 */
export const getFretboardNotes = (tuning, totalFrets, scaleNotes) => {
  const positions = [];

  tuning.forEach((stringRoot, stringIndex) => {
    for (let fret = 0; fret <= totalFrets; fret++) {
      const note = getNoteAt(stringRoot, fret);
      if (scaleNotes.includes(note)) {
        positions.push({
          string: stringIndex,
          fret,
          label: note,
          isRoot: note === scaleNotes[0]
        });
      }
    }
  });

  return positions;
};
