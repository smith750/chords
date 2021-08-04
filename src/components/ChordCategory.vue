<template>
  <div class="chord-category"><h2>{{ category }}</h2></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ChordCategory extends Vue {
  @Prop({ required: true, type: String }) readonly category!: string
}
</script>

<style scoped>
.chord-category {
  font-weight: 600;
  background-color: lavender;
  border-radius: 5px;
  padding: 3px;
}

.chord-category h2 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1em;
  font-weight: normal;
}
</style>
