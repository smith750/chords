<template>
  <div id="scale">
    <span v-for="(note, idx) in notes" :key="idx">{{ note }}</span>
  </div>
</template>

<script lang="ts">
import { scale, majorScaleGuide, chord } from '../lib/scalesChords'

const scaleNotes = scale(majorScaleGuide, 0)

const firstChord = chord(scaleNotes, 0, 3)
const secondChord = chord(scaleNotes, 1, 3)
const firstSeventh = chord(scaleNotes, 0, 5)
console.log('first chord = ', firstChord)
console.log('second chord = ', secondChord)
console.log('first seventh = ', firstSeventh)

export default {
  name: 'Scale',
  components: {
  },
  data: function () {
    return {
      notes: scaleNotes.map((note: Note) => note.sharp)
    }
  }
}
</script>

<style scoped>
  #scale span {
    padding: 0 5px 20px 5px;
  }
</style>
