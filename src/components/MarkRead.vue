<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    markRead() {
      if (this.$store.state.modal.isOpen) {
        this.$store.commit('markRead', this.$store.state.modal.emailId)
        return
      }
      this.currentMarkedEmails.forEach((markEmail: { id: number; }) => {
        this.$store.commit('markRead', markEmail.id)
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
  <button class="mark-read-btn" @click="markRead">Mark as read (r)</button>
</template>

<style lang="scss" scoped>

</style>
