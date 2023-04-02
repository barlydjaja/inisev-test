<script lang="ts">
import {defineComponent} from "vue";
import {mapMutations} from "vuex";

export default defineComponent({
  methods: {
    ...mapMutations([
        'markRead',
        'toggleCheckedAll'
    ]),
    markReadMail() {
      if (this.$store.state.modal.isOpen) {
        this.markRead(this.$store.state.modal.emailId)
        return
      }
      this.currentMarkedEmails.forEach((markEmail: { id: number; }) => {
        this.markRead(markEmail.id)
      })
      this.toggleCheckedAll(false)
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
  <button class="mark-read-btn" @click="markReadMail">Mark as read (r)</button>
</template>

<style lang="scss" scoped>

</style>
