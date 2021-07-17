<template>
  <div id="chord-charts">
    <ScaleChords :keyRoot="root" :scaleName="'Major'" :scaleNotesGuide="majorScaleGuide" />

<!--
    <ChordCategory category="Secondary Dominant Triads" />
    <ChordEmpty />
    <Chord name="A" numeral="V/ii" spelling="A-C&sharp;-E" />
    <Chord name="B" numeral="V/iii" spelling="B-D&sharp;-F&sharp;" />
    <ChordEmpty />
    <Chord name="D" numeral="V/V" spelling="D-F&sharp;-A" />
    <Chord name="E" numeral="V/vi" spelling="E-G&sharp;-B" />
    <ChordEmpty />

    <ChordCategory category="Secondary Dominant Sevenths" />
    <ChordEmpty />
    <Chord name="A" numeral="V/ii" spelling="A-C&sharp;-E-F&sharp;" seventh="7" />
    <Chord name="B" numeral="V/iii" spelling="B-D&sharp;-F&sharp;-A" seventh="7" />
    <Chord name="C" numeral="V/IV" spelling="C-E-G-B&flat;" seventh="7" />
    <Chord name="D" numeral="V/V" spelling="D-F&sharp;-A-C&sharp;" seventh="7" />
    <Chord name="E" numeral="V/vi" spelling="E-G&sharp;-B-D&sharp;" seventh="7" />
    <ChordEmpty />
-->
  </div>
</template>

<script lang="ts">
// import ChordCategory from './ChordCategory.vue'
// import Chord from './Chord.vue'
// import ChordEmpty from './ChordEmpty.vue'
import ScaleChords from './ScaleChords.vue'
import { majorScaleGuide } from '../lib/scalesChords'

export default {
  components: {
    // ChordCategory,
    // Chord,
    // ChordEmpty,
    ScaleChords
  },
  data: function () {
    return {
      synth: this.$store.state.synth,
      root: this.$store.state.key,
      majorScaleGuide
    }
  }
}
</script>

<style scoped>
#chord-charts {
  display: grid;
  grid-template-columns: repeat(1, 100%);
  column-gap: 10px;
  row-gap: 10px;
  width: 80%;
}
</style>
