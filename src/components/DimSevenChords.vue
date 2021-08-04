<template>
  <div class="chord-chart">
    <ChordCategory :category="'Diminished Sevenths'" />
    <ChordDisplay v-for="cTriad in triads" :chord="cTriad" :key="cTriad.root.sharpNote + ' vii'" :bias="majorScale.bias"/>

    <ChordCategory :category="'Dominant Diminished Sevenths'" />
    <ChordDisplay v-for="cSeventh in sevenths" :chord="cSeventh" :key="cSeventh.root.sharpNote + ' vii7'" :bias="majorScale.bias"/>
  </div>
</template>

<script lang="ts">
import ChordCategory from './ChordCategory.vue'
import ChordDisplay from './ChordDisplay.vue'
import { majorScale, scale, determineDimSeventh, determineDimSeventhDominant, Note }
  from '../lib/scalesChords'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ChordCategory,
    ChordDisplay
  }
})
export default class FifthsChords extends Vue {
  @Prop({ required: true }) readonly keyRoot!: Note

  private majorScale = majorScale

  get majorScaleNotes () {
    return scale(majorScale.guide, this.$store.state.ChordsStore.key.step)
  }

  get triads () {
    return this.majorScaleNotes.map((note: Note) => determineDimSeventh(note))
  }

  get sevenths () {
    return this.majorScaleNotes.map((note: Note) => determineDimSeventhDominant(note))
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
  padding: 15px 0 0 15px;
}
</style>
