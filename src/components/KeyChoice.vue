<template>
  <div id="key-choice">
    <select @change="updateKey">
      <option v-for="(note, idx) in notes" :key="idx" v-bind:value="note.step">{{ note.display() }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { allNotes } from '../lib/scalesChords'

export default {
  name: 'KeyChoice',
  components: {
  },
  data: function () {
    return {
      notes: allNotes,
      key: this.$store.state.key
    }
  },
  methods: {
    updateKey (evt) {
      this.$store.commit('changeKey', evt.target.value)
    }
  }
}
</script>

<style scoped>
</style>
