<template>
  <div class="chord" v-on:mousedown="startNotes" v-on:mouseup="stopNotes">
    <div class="chord-name">{{ chordName }}<span v:if="seventh !== undefined" class="seventh">{{ seventh }}</span></div>
    <div class="chord-symbol" v:if="numeral !== undefined">{{ numeral }}<span v:if="seventh !== undefined" class="seventh">{{ seventh }}</span></div>
    <div class="spelling">{{ chordSpelling }}</div>
  </div>
</template>

<script lang="ts">
import * as Tone from 'tone'
import { PropType } from 'vue'
import { Note, Chord } from '../lib/scalesChords'

export default {
  props: {
    name: String,
    numeral: String,
    spelling: String,
    seventh: String,
    chord: { type: Object as PropType<Chord> },
    notes: { type: Array as PropType<string[]> }
  },
  computed: {
    chordSpelling: function () {
      if (this.chord) {
        return this.chord.notes.map((note: Note) => note.sharp).join('-')
      } else {
        return this.spelling
      }
    },
    chordName: function () {
      if (this.chord) {
        return (this.chord.root.sharp + this.chord.name)
      } else {
        return this.name
      }
    }
  },
  methods: {
    startNotes: function () {
      if (this.notes !== undefined) {
        const now = Tone.now()
        for (const note of this.notes) {
          this.$store.state.synth.triggerAttack(note, now)
        }
      }
    },
    stopNotes: function () {
      if (this.notes !== undefined) {
        const now = Tone.now()
        this.$store.state.synth.triggerRelease(this.notes, now)
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
