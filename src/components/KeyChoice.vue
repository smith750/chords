<template>
  <div id="key-choice">
    <select @change="updateKey">
      <option v-for="(note, idx) in notes" :key="idx" v-bind:value="note.step" v-html="note.display"/>
    </select>
  </div>
</template>

<script lang="ts">
import { allNotes } from '../lib/scalesChords'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class KeyChoice extends Vue {
  private notes = allNotes;
  private key = this.$store.state.ChordsStore.key;

  updateKey (evt: any) {
    this.$store.commit('changeKey', evt.target.value)
  }
}
</script>

<style scoped>
</style>
