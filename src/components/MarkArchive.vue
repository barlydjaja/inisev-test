<script lang="ts">
import {defineComponent} from "vue";
import {mapMutations} from "vuex";

export default defineComponent({
  methods: {
    ...mapMutations([
        'toArchive',
        'toggleCheckedAll'
    ]),
    markArchive() {
      if (this.$store.state.modal.isOpen) {
        this.toArchive(this.$store.state.modal.emailId)
        return
      }
      this.currentMarkedEmails.forEach((markEmail: { id: number; }) => {
        this.toArchive(markEmail.id)
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
  <button class="mark-read-btn" @click="markArchive">Archive (a)</button>
</template>

<style lang="scss" scoped>

</style>
