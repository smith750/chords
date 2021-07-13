<template>
  <div class="chord-category">{{ category }}</div>
</template>

<script lang="ts">
export default {
  name: 'ChordCategory',
  props: {
    category: String
  }
}
</script>

<style scoped>
.chord-category {
  font-weight: 600;
  background-color: lavender;
  border-radius: 5px;
  padding: 3px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1em;
}
</style>
