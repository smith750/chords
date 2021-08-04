<template>
  <div id="chord-charts">
    <ScaleChords :keyRoot="root" :scaleName="'Major'" :mode="majorScale" />
    <FifthsChords :keyRoot="root" />
    <DimSeventhChords :keyRoot="root" />
    <ScaleChords :keyRoot="root" :scaleName="'Minor'" :mode="minorScale" />
    <ScaleChords :keyRoot="root" :scaleName="'Lydian'" :mode="lydianMode" />
    <ScaleChords :keyRoot="root" :scaleName="'Mixolydian'" :mode="mixolydianMode" />
    <ScaleChords :keyRoot="root" :scaleName="'Dorian'" :mode="dorianMode" />
    <ScaleChords :keyRoot="root" :scaleName="'Phrygian'" :mode="phrygianMode" />
    <ScaleChords :keyRoot="root" :scaleName="'Locrian'" :mode="locrianMode" />
  </div>
</template>

<script lang="ts">
import ScaleChords from './ScaleChords.vue'
import FifthsChords from './FifthsChords.vue'
import DimSeventhChords from './DimSevenChords.vue'
import {
  majorScale, minorScale, lydianMode, mixolydianMode,
  dorianMode, phrygianMode, locrianMode
} from '../lib/scalesChords'
import { Component, Vue } from 'vue-property-decorator'

// https://blog.logrocket.com/vue-typescript-tutorial-examples/

@Component({
  components: {
    ScaleChords,
    FifthsChords,
    DimSeventhChords
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
