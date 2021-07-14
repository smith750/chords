import Vue from 'vue'
import Vuex from 'vuex'
import { scale, majorScaleGuide, allNotes, Note } from './scalesChords'
import * as Tone from 'tone'

const startingKey = allNotes[0]
const scaleNotes = scale(majorScaleGuide, startingKey.step)
const synth = new Tone.PolySynth(Tone.Synth).toDestination()

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    key: startingKey,
    scaleNotes,
    synth
  },
  mutations: {
    changeKey (state, newKeyStep) {
      const newKey = allNotes.find((note: Note) => note.step === parseInt(newKeyStep)) || allNotes[0]
      state.key = newKey
      state.scaleNotes = scale(majorScaleGuide, newKey.step)
    }
  }
})

export default store
