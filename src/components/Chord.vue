<template>
  <div class="chord" v-on:mousedown="startNotes" v-on:mouseup="stopNotes">
    <div class="chord-name">{{ name }}<span v:if="seventh !== undefined" class="seventh">{{ seventh }}</span></div>
    <div class="chord-symbol">{{ numeral }}<span v:if="seventh !== undefined" class="seventh">{{ seventh }}</span></div>
    <div class="spelling">{{ spelling }}</div>
  </div>
</template>

<script lang="ts">
import * as Tone from 'tone'
import { PropType } from 'vue'

export default {
  props: {
    name: String,
    numeral: String,
    spelling: String,
    seventh: String,
    notes: { type: Array as PropType<string[]> },
    synth: Tone.PolySynth
  },
  methods: {
    startNotes: function () {
      if (this.notes !== undefined) {
        const now = Tone.now()
        for (const note of this.notes) {
          this.synth.triggerAttack(note, now)
        }
      }
    },
    stopNotes: function () {
      if (this.notes !== undefined) {
        const now = Tone.now()
        this.synth.triggerRelease(this.notes, now)
      }
    }
  }
}
</script>

<style scoped>
.chord {
  border-radius: 5px;
  border: 3px solid #000000;
  padding: 3px;
}

.chord-name {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1em;
}

.chord-symbol {
  font-family: "Times New Roman", Times, serif;
  font-size: 0.8em;
}

.seventh {
  vertical-align: super;
  font-size: 60%;
}

.spelling {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1em;
}
</style>
