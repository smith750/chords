// https://fitzgen.github.io/wu.js/#take
import wu from 'wu'

interface Note {
  step: number;
  sharp: string;
  flat: string;
  display(): string;
}

interface Chord {
  notes: Array<Note>;
  root: Note;
  name: string;
}

const stepsDifference: ((rootNote: Note, deltaNote: Note) => number) = (rootNote: Note, deltaNote: Note) => {
  if (rootNote.step > deltaNote.step) {
    return ((deltaNote.step + 12) - rootNote.step)
  } else {
    return (deltaNote.step - rootNote.step)
  }
}

const triadName: ((chordNotes: Array<Note>) => string) = (chordNotes: Array<Note>) => {
  const middleSteps = stepsDifference(chordNotes[0], chordNotes[1])
  const outsideSteps = stepsDifference(chordNotes[0], chordNotes[2])

  switch (middleSteps) {
    case 2:
      if (outsideSteps === 7) {
        return 'sus2'
      }
      break
    case 3:
      if (outsideSteps === 7) {
        return 'm'
      } else if (outsideSteps === 6) {
        return 'dim'
      }
      break
    case 4:
      if (outsideSteps === 7) {
        return ''
      } else if (outsideSteps === 8) {
        return 'aug'
      }
      break
    case 5:
      if (outsideSteps === 7) {
        return 'sus4'
      }
      break
  }
  return 'UNKNOWN'
}

const seventhName: ((chordNotes: Array<Note>) => string) = (chordNotes: Array<Note>) => {
  const middleSteps = stepsDifference(chordNotes[0], chordNotes[1])
  const outsideSteps = stepsDifference(chordNotes[0], chordNotes[2])
  const topSteps = stepsDifference(chordNotes[0], chordNotes[3])

  switch (middleSteps) {
    case 3:
      if (outsideSteps === 7) {
        if (topSteps === 11) {
          return 'm (maj 7)'
        } else if (topSteps === 10) {
          return 'm7'
        }
      } else if (outsideSteps === 6) {
        if (topSteps === 11) {
          return 'b5 (maj 7)'
        } else if (topSteps === 10) {
          return 'b5/7'
        }
      }
      break
    case 4:
      if (outsideSteps === 7) {
        if (topSteps === 11) {
          return 'maj7'
        } else if (topSteps === 10) {
          return '7'
        }
      } else if (outsideSteps === 8) {
        if (topSteps === 11) {
          return 'aug (maj 7)'
        } else if (topSteps === 10) {
          return 'aug 7'
        }
      }
      break
  }
  return 'UNKNOWN'
}

const chordName: ((chordNotes: Array<Note>) => string) = (chordNotes: Array<Note>) => {
  if (chordNotes.length === 3) {
    return triadName(chordNotes)
  } else if (chordNotes.length === 4) {
    return seventhName(chordNotes)
  } else {
    return ''
  }
}

const chord: ((scale: Array<Note>, start: number, size: number) => Chord) =
  (scale: Array<Note>, start: number, size: number) => {
    const scaleArray: Array<Note> = wu.cycle(scale).drop(start).take(size + 2).toArray()
    const notes = scaleArray.filter((note: Note, idx: number) => idx % 2 === 0)
    const root = notes[0]
    const name = chordName(notes)
    return { notes, root, name }
  }

const allNotes: Array<Note> = [
  { sharp: 'C', flat: 'C', step: 1, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'C#', flat: 'Db', step: 2, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'D', flat: 'D', step: 3, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'D#', flat: 'Eb', step: 4, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'E', flat: 'E', step: 5, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'F', flat: 'F', step: 6, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'F#', flat: 'Gb', step: 7, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'G', flat: 'G', step: 8, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'G#', flat: 'Ab', step: 9, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'A', flat: 'A', step: 10, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'A#', flat: 'Bb', step: 11, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } },
  { sharp: 'B', flat: 'B', step: 12, display: function () { return (this.sharp === this.flat) ? this.sharp : this.sharp + ' / ' + this.flat } }
]

const majorScaleGuide = [true, false, true, false, true, true, false, true, false, true, false, true]

const scale: ((scaleGuide: Array<boolean>, startStep: number) => Array<Note>) = (scaleGuide: Array<boolean>, startStep = 0) => {
  return wu.zip(wu.cycle(allNotes), wu.cycle(scaleGuide))
    .dropWhile((noteInfo: [Note, boolean]) => noteInfo[0].step !== startStep)
    .filter((noteInfo: [Note, boolean]) => noteInfo[1])
    .map((noteInfo: [Note, boolean]) => noteInfo[0])
    .take(8)
    .toArray()
}

export {
  Note,
  Chord,
  chord,
  allNotes,
  majorScaleGuide,
  scale
}
