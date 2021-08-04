// https://fitzgen.github.io/wu.js/#take
import wu from 'wu'

class Note {
  step: number;
  sharp: string;
  flat: string;
  circleOfFithsStep: number;

  constructor (step: number, sharp: string, flat: string, circleOfFifthsStep: number) {
    this.step = step
    this.sharp = sharp
    this.flat = flat
    this.circleOfFithsStep = circleOfFifthsStep
  }

  get display (): string {
    return (this.sharp === this.flat) ? this.sharp : this.sharpNote + ' / ' + this.flatNote
  }

  biasedDisplay (bias: string): string {
    if (this.sharp === this.flat || bias === 'sharp') {
      return this.sharp
    } else {
      return this.flat
    }
  }

  get sharpNote () {
    return this.sharp.replace('#', '&sharp;')
  }

  get flatNote () {
    return this.flat.replace('b', '&flat;')
  }
}

class Chord {
  notes: Array<Note>;
  root: Note;
  name: string;

  constructor (notes: Array<Note>, root: Note) {
    this.notes = notes
    this.root = root
    this.name = this.chordName()
  }

  midiNotes (): Array<string> {
    const startStep = this.root.step
    return this.notes.map((note) => {
      if (note.step < startStep) {
        return note.sharp + '4'
      } else {
        return note.sharp + '3'
      }
    })
  }

  stepsDifference: ((rootNote: Note, deltaNote: Note) => number) = (rootNote: Note, deltaNote: Note) => {
    if (rootNote.step > deltaNote.step) {
      return ((deltaNote.step + 12) - rootNote.step)
    } else {
      return (deltaNote.step - rootNote.step)
    }
  }

  triadName (): string {
    const middleSteps = this.stepsDifference(this.notes[0], this.notes[1])
    const outsideSteps = this.stepsDifference(this.notes[0], this.notes[2])

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

  seventhName (): string {
    const middleSteps = this.stepsDifference(this.notes[0], this.notes[1])
    const outsideSteps = this.stepsDifference(this.notes[0], this.notes[2])
    const topSteps = this.stepsDifference(this.notes[0], this.notes[3])

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
            return '&flat;5 (maj 7)'
          } else if (topSteps === 10) {
            return '&flat;5/7'
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

  chordName (): string {
    if (this.notes.length === 3) {
      return this.triadName()
    } else if (this.notes.length === 4) {
      return this.seventhName()
    } else {
      return ''
    }
  }
}

const chord: ((scale: Array<Note>, start: number, size: number) => Chord) =
  (scale: Array<Note>, start: number, size: number) => {
    const scaleArray: Array<Note> = wu.cycle(scale).drop(start).take(size + 2).toArray()
    const notes = scaleArray.filter((note: Note, idx: number) => idx % 2 === 0)
    const root = notes[0]
    return new Chord(notes, root)
  }

const allNotes: Array<Note> = [
  new Note(1, 'C', 'C', 1),
  new Note(2, 'C#', 'Db', 8),
  new Note(3, 'D', 'D', 3),
  new Note(4, 'D#', 'Eb', 10),
  new Note(5, 'E', 'E', 5),
  new Note(6, 'F', 'F', 12),
  new Note(7, 'F#', 'Gb', 7),
  new Note(8, 'G', 'G', 2),
  new Note(9, 'G#', 'Ab', 9),
  new Note(10, 'A', 'A', 4),
  new Note(11, 'A#', 'Bb', 11),
  new Note(12, 'B', 'B', 6)
]

class Mode {
  guide: Array<boolean>;
  biasDirection: string;
  biasSteps: number;

  constructor (guide: Array<boolean>, biasDirection: string, biasSteps: number) {
    this.guide = guide
    this.biasDirection = biasDirection
    this.biasSteps = biasSteps
  }

  biasFor (startCircleOfFithsStep: number): string {
    const adjustmentSteps = (this.biasDirection === 'flat') ? (this.biasSteps * -1) : this.biasSteps
    const adjustedSteps = startCircleOfFithsStep + adjustmentSteps
    const fixedAdjustedSteps = (adjustedSteps < 1) ? (adjustedSteps + 12) : adjustedSteps
    if (fixedAdjustedSteps >= 1 && fixedAdjustedSteps <= 7) {
      return 'sharp'
    } else {
      return 'flat'
    }
  }
}

class Scale {
  startStep: number;
  mode: Mode;
  bias: string;
  notes: Array<Note>

  constructor (startStep: number, mode: Mode) {
    this.startStep = startStep
    this.mode = mode
    this.notes = this.scaleNotes()
    this.bias = mode.biasFor(this.notes[0].circleOfFithsStep)
  }

  scaleNotes (): Array<Note> {
    return wu.zip(wu.cycle(allNotes).dropWhile((note: Note) => note.step !== this.startStep), wu.cycle(this.mode.guide))
      .filter((noteInfo: [Note, boolean]) => noteInfo[1])
      .map((noteInfo: [Note, boolean]) => noteInfo[0])
      .take(7)
      .toArray()
  }
}

const lydianMode = new Mode([true, false, true, false, true, false, true, true, false, true, false, true], 'sharp', 1)
const majorScale = new Mode([true, false, true, false, true, true, false, true, false, true, false, true], 'sharp', 0)
const mixolydianMode = new Mode([true, false, true, false, true, true, false, true, false, true, true, false], 'flat', 1)
const dorianMode = new Mode([true, false, true, true, false, true, false, true, false, true, true, false], 'flat', 2)
const minorScale = new Mode([true, false, true, true, false, true, false, true, true, false, true, false], 'flat', 3)
const phrygianMode = new Mode([true, true, false, true, false, true, false, true, true, false, true, false], 'flat', 4)
const locrianMode = new Mode([true, true, false, true, false, true, true, false, true, false, true, false], 'flat', 5)

const scale: ((scaleGuide: Array<boolean>, startStep: number) => Array<Note>) = (scaleGuide: Array<boolean>, startStep = 0): Array<Note> => {
  return wu.zip(wu.cycle(allNotes).dropWhile((note: Note) => note.step !== startStep), wu.cycle(scaleGuide))
    .filter((noteInfo: [Note, boolean]) => noteInfo[1])
    .map((noteInfo: [Note, boolean]) => noteInfo[0])
    .take(7)
    .toArray()
}

const determineDominant: ((root: Note) => Chord) = (root: Note): Chord => {
  return chord(scale(majorScale.guide, root.step), 4, 3)
}

const determineDominantSeventh: ((root: Note) => Chord) = (root: Note): Chord => {
  return chord(scale(majorScale.guide, root.step), 4, 5)
}

const determineDimSeventh: ((root: Note) => Chord) = (root: Note): Chord => {
  return chord(scale(majorScale.guide, root.step), 6, 3)
}

const determineDimSeventhDominant: ((root: Note) => Chord) = (root: Note): Chord => {
  return chord(scale(majorScale.guide, root.step), 6, 5)
}

export {
  Note,
  Chord,
  chord,
  allNotes,
  lydianMode,
  majorScale,
  mixolydianMode,
  dorianMode,
  minorScale,
  phrygianMode,
  locrianMode,
  scale,
  Scale,
  Mode,
  determineDominant,
  determineDominantSeventh,
  determineDimSeventh,
  determineDimSeventhDominant
}
