<template>
  <div v-if="toneInitialized">
    <ChordChart />
  </div>
  <div class="loading" v-else>
    Initializing....
  </div>
</template>

<script>
import * as Tone from 'tone'

export default {
  data() {
    return {
      toneInitialized: false
    }
  },
  methods: {
    mounted() {
      Tone.start().then(() => {
        this.toneInitialized = true
      })
    }
  }
}
</script>

<style scoped>
.loading {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1em;
}
</style>
