<template>
  <div class="chord-chart">
    <ChordCategory category="Primary Triads" />
    <Chord v-for="c in triads" :chord="c" :key="c.root.sharp"/>

    <ChordCategory category="Primary Sevenths" />
    <Chord v-for="c in sevenths" :chord="c" :key="c.root.sharp"/>
  </div>
</template>

<script lang="ts">
import ChordCategory from './ChordCategory.vue'
import Chord from './Chord.vue'
import { scale, chord, Note } from '../lib/scalesChords'
import { PropType } from 'vue'

export default {
  components: {
    ChordCategory,
    Chord
  },
  props: {
    keyRoot: { type: Object as PropType<Note> },
    scaleName: String,
    scaleNotesGuide: { type: Array as PropType<boolean[]> }
  },
  computed: {
    scaleNotes: function () {
      const startingStep = this.$store.state.key.step
      return scale(this.scaleNotesGuide, startingStep)
    },
    triads: function () {
      const sn = this.scaleNotes
      return sn.map((note: Note, idx: number) => chord(sn, idx, 3))
    },
    sevenths: function () {
      const sn = this.scaleNotes
      return sn.map((note: Note, idx: number) => chord(sn, idx, 5))
    }
  },
  data: function () {
    // const scaleNotes = scale(this.scaleNotesGuide, this.$store.state.key.step)
    // const triads = scaleNotes.map((note: Note, idx: number) => chord(scaleNotes, idx, 3))
    return {
      synth: this.$store.state.synth
      // triads
    }
  }
}
</script>

<style scoped>
.chord-chart {
  display: grid;
  grid-template-columns: repeat(8, 12.5%);
  column-gap: 10px;
  row-gap: 10px;
  width: 100%;
}
</style>
