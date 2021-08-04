<template>
  <button class="chord" v-on:mousedown="startNotes" v-on:mouseup="stopNotes">
    <span class="chord-name" v-html="chordName"><span v:if="seventh !== undefined" class="seventh">{{ seventh }}</span></span>
    <span class="chord-symbol" v:if="numeral !== undefined">{{ numeral }}<span v:if="seventh !== undefined" class="seventh">{{ seventh }}</span></span>
    <span class="spelling" v-html="chordSpelling"/>
  </button>
</template>

<script lang="ts">
import * as Tone from 'tone'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Note, Chord } from '../lib/scalesChords'

@Component
export default class ChordDisplay extends Vue {
  @Prop(String) readonly name: string | undefined
  @Prop(String) readonly numeral: string | undefined
  @Prop(String) readonly spelling: string | undefined
  @Prop(String) readonly seventh: string | undefined
  @Prop() readonly chord: Chord | undefined
  @Prop(String) readonly bias: string | undefined
  @Prop(Array) readonly notes: string[] | undefined

  get chordSpelling (): string {
    if (this.chord) {
      return this.chord.notes.map((note: Note) => (this.bias === 'flat') ? note.flatNote : note.sharpNote).join('-')
    } else {
      return (this.spelling as string)
    }
  }

  get chordName (): string {
    if (this.chord) {
      const rootName = (this.bias === 'flat') ? this.chord.root.flatNote : this.chord.root.sharpNote
      return (rootName + this.chord.name)
    } else {
      return (this.name as string)
    }
  }

  get midiNotes (): Array<string> {
    if (this.chord !== undefined) {
      return this.chord.midiNotes()
    } else if (this.notes !== undefined) {
      return this.notes
    } else {
      return []
    }
  }

  startNotes () {
    const now = Tone.now()
    for (const note of this.midiNotes) {
      this.$store.state.ChordsStore.synth.triggerAttack(note, now)
    }
  }

  stopNotes () {
    const now = Tone.now()
    this.$store.state.ChordsStore.synth.triggerRelease(this.midiNotes, now)
  }
}
</script>

<style scoped>
.chord {
  border-radius: 5px;
  border: 3px solid #000000;
  padding: 3px;
  background-color: #fff;
}

.chord-name {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1em;
  display: block;
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
