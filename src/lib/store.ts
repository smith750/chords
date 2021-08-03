import Vue from 'vue'
import Vuex from 'vuex'
import { Scale as ChordScale, allNotes, Note, majorScale } from './scalesChords'
import * as Tone from 'tone'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

const startingKey = allNotes[0]
const synth = new Tone.PolySynth(Tone.Synth).toDestination()

Vue.use(Vuex)

@Module({ namespaced: true, name: 'chords' })
class ChordsStore extends VuexModule {
  private key = startingKey
  private scale = new ChordScale(startingKey.step, majorScale)
  private synth = synth

  @Mutation
  public changeKey (newKeyStep: string) {
    const newKey = allNotes.find((note: Note) => note.step === parseInt(newKeyStep)) || allNotes[0]
    this.key = newKey
    this.scale = new ChordScale(newKey.step, majorScale)
  }
}

const store = new Vuex.Store({
  modules: {
    ChordsStore
  }
})

export default store
