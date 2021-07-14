<template>
  <div id="scale">
    <span v-for="(note, idx) in scaleNotes" :key="idx">{{ note }}</span>
  </div>
</template>

<script lang="ts">
import { Note } from '../lib/scalesChords'

// const firstChord = chord(this.$store.state.scaleNotes, 0, 3)
// const secondChord = chord(this.$store.scaleNotes, 1, 3)
// const firstSeventh = chord(this.$store.scaleNotes, 0, 5)
// console.log('first chord = ', firstChord)
// console.log('second chord = ', secondChord)
// console.log('first seventh = ', firstSeventh)

export default {
  name: 'Scale',
  components: {
  },
  computed: {
    scaleNotes () {
      return this.$store.state.scaleNotes.map((note: Note) => note.sharp)
    }
  }
}
</script>

<style scoped>
  #scale span {
    padding: 0 5px 20px 5px;
  }
</style>
