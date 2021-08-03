<template>
  <div class="chord-chart">
    <ChordCategory :category="scaleName + ' Triads'" />
    <ChordDisplay v-for="cTriad in triads" :chord="cTriad" :key="cTriad.root.sharpNote + scaleName + 'triad'" :bias="scale.bias"/>

    <ChordCategory :category="scaleName + ' Sevenths'" />
    <ChordDisplay v-for="cSeventh in sevenths" :chord="cSeventh" :key="cSeventh.root.sharpNote + scaleName + 'seventh'" :bias="scale.bias"/>
  </div>
</template>

<script lang="ts">
import ChordCategory from './ChordCategory.vue'
import ChordDisplay from './ChordDisplay.vue'
import { Scale, Mode, chord, Note } from '../lib/scalesChords'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ChordCategory,
    ChordDisplay
  }
})
export default class ScaleChords extends Vue {
  @Prop({ required: true }) readonly keyRoot!: Note
  @Prop({ required: true, type: String }) readonly scaleName!: string
  @Prop({ required: true }) readonly mode!: Mode

  private synth = this.$store.state.ChordsStore.synth

  get scale () {
    const startingStep = this.$store.state.ChordsStore.key.step
    return new Scale(startingStep, this.mode)
  }

  get triads () {
    const sn = this.scale.notes
    return sn.map((note: Note, idx: number) => chord(sn, idx, 3))
  }

  get sevenths () {
    const sn = this.scale.notes
    return sn.map((note: Note, idx: number) => chord(sn, idx, 5))
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
