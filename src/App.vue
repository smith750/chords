<template>
  <div id="app">
    <Scale/>
    <ChordChart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChordChart from './components/ChordChart.vue'
import Scale from './components/Scale.vue'

@Component({
  components: {
    ChordChart,
    Scale
  }
})

export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
