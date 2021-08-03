<template>
  <div id="scale">
    <span v-for="(note, idx) in scaleNotes" :key="idx" v-html="note"/>
  </div>
</template>

<script lang="ts">
import { Note } from '../lib/scalesChords'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Scale extends Vue {
  get scaleNotes () {
    const scale = this.$store.state.ChordsStore.scale
    return scale.notes.map((note: Note) => (scale.bias === 'flat') ? note.flatNote : note.sharpNote)
  }
}
</script>

<style scoped>
  #scale span {
    padding: 0 5px 20px 5px;
  }
</style>
