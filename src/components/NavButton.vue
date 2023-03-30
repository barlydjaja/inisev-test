<script setup lang="ts">
defineProps<{
  text: string
  count?: number
}>()

</script>

<template>
  <button class="nav-button">
    {{ text }} <span v-if="typeof count === 'number'">({{ count }})</span>
  </button>
</template>


<style scoped lang="scss">
@import "@/assets/base.scss";
.nav-button {
  background: $white;
  border: none;
  padding: 0.5em 1em;
  width: 100%;
  border-radius: 0.25em;
  text-align: left;
  cursor: pointer;
}
</style>
