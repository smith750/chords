<template>
  <div id="chord-charts">
    <ScaleChords :keyRoot="root" :scaleName="'Major'" :mode="majorScale" />
    <hr/>
    <ScaleChords :keyRoot="root" :scaleName="'Minor'" :mode="minorScale" />
    <hr/>
    <ScaleChords :keyRoot="root" :scaleName="'Lydian'" :mode="lydianMode" />
    <hr/>
    <ScaleChords :keyRoot="root" :scaleName="'Mixolydian'" :mode="mixolydianMode" />
    <hr/>
    <ScaleChords :keyRoot="root" :scaleName="'Dorian'" :mode="dorianMode" />
    <hr/>
    <ScaleChords :keyRoot="root" :scaleName="'Phrygian'" :mode="phrygianMode" />
    <hr/>
    <ScaleChords :keyRoot="root" :scaleName="'Locrian'" :mode="locrianMode" />

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
import {
  majorScale, minorScale, lydianMode, mixolydianMode,
  dorianMode, phrygianMode, locrianMode
} from '../lib/scalesChords'
import { Component, Vue } from 'vue-property-decorator'

// https://blog.logrocket.com/vue-typescript-tutorial-examples/

@Component({
  components: {
    ScaleChords
  }
})
export default class ChordChart extends Vue {
    private synth = this.$store.state.ChordsStore.synth;
    private root = this.$store.state.ChordsStore.key;
    private majorScale = majorScale;
    private minorScale = minorScale;
    private lydianMode = lydianMode;
    private mixolydianMode = mixolydianMode;
    private dorianMode = dorianMode;
    private phrygianMode = phrygianMode;
    private locrianMode = locrianMode;
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
