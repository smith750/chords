<template>
  <div v-if="toneInitialized">
    <ChordChart />
  </div>
  <div class="loading" v-else>
    Initializing....
  </div>
</template>

<script lang="ts">
import * as Tone from 'tone'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ChordWrapper extends Vue {
  private toneInitialized: boolean  = false

  mounted() {
    Tone.start().then(() => {
      this.toneInitialized = true
    })
  }
}
</script>

<style scoped>
.loading {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1em;
}
</style>
