<script lang="ts">
import {defineComponent} from "vue";
import CheckBox from "@/components/CheckBox.vue";

export default defineComponent({
  components: {CheckBox},
  props: {
    id: Number,
    isRead: Boolean,
    title: String,
    isChecked: Boolean,
  },
  methods: {
    onCheckboxClick(e: any) {
      e.stopPropagation()
      this.$store.commit('markSelected', this.id)
    }
  }
})
</script>

<template>
  <main class="content__container" :class="{'is-read': isRead}">
    <CheckBox :is-checked="isChecked" @onCheckboxClick="onCheckboxClick"/>
    <div class="content__container--title">{{title}}</div>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";
.content__container {
  padding: 0.5em;
  display: flex;
  gap: 1em;
  background: $light-grey;
  border-radius: 0.25em;
  border: 1px $grey solid;
  &--title {
    cursor: pointer;
  }
  &.is-read {
    opacity: 0.5;
  }
}
</style>
