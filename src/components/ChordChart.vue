<template>
  <div id="chord-chart">
    <ChordCategory category="Primary Sevenths" />
    <Chord name="C" numeral="I" spelling="C-E-G" :synth="synth" :notes="['C4', 'E4', 'G4']" />
    <Chord name="Dm" numeral="ii" spelling="D-F-A" :synth="synth" :notes="['D4', 'F4', 'A4']"/>
    <Chord name="Em" numeral="iii" spelling="E-G-B" :synth="synth" :notes="['E4', 'G4', 'B4']"/>
    <Chord name="F" numeral="IV" spelling="F-A-C" :synth="synth" :notes="['F4', 'A4', 'C5']"/>
    <Chord name="G" numeral="V" spelling="G-B-D" :synth="synth" :notes="['G4', 'B4', 'D5']"/>
    <Chord name="Am" numeral="vi" spelling="A-C-E" :synth="synth" :notes="['A4', 'C5', 'E5']"/>
    <Chord name="B&deg;" numeral="vii&deg;" spelling="B-D-F" :synth="synth" :notes="['B4', 'D5', 'F5']"/>

    <ChordCategory category="Primary Sevenths" />
    <Chord name="C" numeral="I" seventh="Maj7" spelling="C-E-G-B" :synth="synth" :notes="['C4', 'E4', 'G4', 'B4']" />
    <Chord name="Dm" numeral="ii" seventh="7" spelling="D-F-A-C" :synth="synth" :notes="['D4', 'F4', 'A4', 'C5']" />
    <Chord name="Em" numeral="iii" seventh="7" spelling="E-G-B-D" :synth="synth" :notes="['E4', 'G4', 'B4', 'D5']" />
    <Chord name="F" numeral="IV" seventh="Maj7" spelling="F-A-C-E" :synth="synth" :notes="['F4', 'A4', 'C5', 'E5']" />
    <Chord name="G" numeral="V" seventh="7" spelling="G-B-D-F" :synth="synth" :notes="['G4', 'B4', 'D5', 'F5']" />
    <Chord name="Am" numeral="vi" seventh="7" spelling="A-C-E-G" :synth="synth" :notes="['A4', 'C5', 'E5', 'G5']" />
    <Chord name="B&deg;" numeral="vii&deg;" seventh="7&flat;5" spelling="B-D-F-A" :synth="synth" :notes="['B4', 'D5', 'F5', 'A5']" />

    <ChordCategory category="Secondary Dominant Triads" />
    <ChordEmpty />
    <Chord name="A" numeral="V/ii" spelling="A-C&sharp;-E" />
    <Chord name="B" numeral="V/iii" spelling="B-D&sharp;-F&sharp;" />
    <ChordEmpty />
    <Chord name="D" numeral="V/V" spelling="D-F&sharp;-A" />
    <Chord name="E" numeral="V/vi" spelling="E-G&sharp;-B" />
    <ChordEmpty />

    <ChordCategory category="Secondary Dominant Sevenths" />
    <ChordEmpty />
    <Chord name="A" numeral="V/ii" spelling="A-C&sharp;-E-F&sharp;" seventh="7" />
    <Chord name="B" numeral="V/iii" spelling="B-D&sharp;-F&sharp;-A" seventh="7" />
    <Chord name="C" numeral="V/IV" spelling="C-E-G-B&flat;" seventh="7" />
    <Chord name="D" numeral="V/V" spelling="D-F&sharp;-A-C&sharp;" seventh="7" />
    <Chord name="E" numeral="V/vi" spelling="E-G&sharp;-B-D&sharp;" seventh="7" />
    <ChordEmpty />
  </div>
</template>

<script lang="ts">
import * as Tone from 'tone'
import ChordCategory from './ChordCategory.vue'
import Chord from './Chord.vue'
import ChordEmpty from './ChordEmpty.vue'

export default {
  components: {
    ChordCategory,
    Chord,
    ChordEmpty
  },
  data: function () {
    return {
      synth: new Tone.PolySynth(Tone.Synth).toDestination()
    }
  }
}
</script>

<style scoped>
#chord-chart {
  display: grid;
  grid-template-columns: repeat(8, 12.5%);
  column-gap: 10px;
  row-gap: 10px;
  width: 80%;
}
</style>
