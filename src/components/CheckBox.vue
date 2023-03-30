<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isChecked: Boolean,
  }
})
</script>

<template>
  <input type="checkbox" class="checkbox" @click="(e) => $emit('onCheckboxClick', e)" :checked='isChecked'>
</template>

<style scoped lang="scss">
.checkbox {
  margin: 0;
  height: 1.5em;
  width: 1.5em;
  cursor: pointer;
}
</style>
