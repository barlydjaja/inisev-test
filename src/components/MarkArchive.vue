<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    markArchive() {
      if (this.$store.state.modal.isOpen) {
        this.$store.commit('toArchive', this.$store.state.modal.emailId)
        return
      }
      this.currentMarkedEmails.forEach((markEmail: { id: number; }) => {
        this.$store.commit('toArchive', markEmail.id)
      })
      this.$store.commit('toggleCheckedAll', false)
    },
  },
  computed: {
    currentMarkedEmails(): any {
      return this.$store.state.emails.filter((email: { isSelected: boolean; }) => email.isSelected)
    },
  }
})
</script>

<template>
  <button class="mark-read-btn" @click="markArchive">Archive (a)</button>
</template>

<style lang="scss" scoped>

</style>
