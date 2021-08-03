<template>
  <div class="chord-empty" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ChordEmpty extends Vue { }
</script>

<style scoped>
.chord-empty {
  border-radius: 5px;
  border: 3px solid #000000;
}
</style>
