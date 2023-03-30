<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    handleCloseModal() {
      this.$store.commit('toggleModal', 0)
    },
    markRead() {
      this.$store.commit('markRead', this.$store.state.modal.emailId)
    },
    markArchive() {
      this.$store.commit('toArchive', this.$store.state.modal.emailId)
    },
    markInbox() {
      this.$store.commit('toInbox', this.$store.state.modal.emailId)
    }
  },
  computed: {
    emailDetails() {
      return this.$store.state.emails.find((email: { id: number; }) => email.id === this.$store.state.modal.emailId)
    },
    currentMarkedEmails(): any {
      return this.$store.state.emails.filter((email: { isSelected: boolean; }) => email.isSelected)
    }
  }
})
</script>

<template>
  <div class="modal">
    <div class="modal__overlay" @click="handleCloseModal"/>
    <div class="modal__content" @click="handleCloseModal">
      <div class="modal__btn--close">Close (Esc)</div>
      <div class="modal__btn--other">
        <button @click="markRead">Mark as read (r)</button>
        <button @click="markArchive" v-if="emailDetails.isInbox">Archive (a)</button>
        <button @click="markInbox" v-else>Inbox (i)</button>
      </div>
      <div class="modal__title">{{emailDetails.title}}</div>
      <div class="modal__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam aspernatur
        consequatur delectus dicta distinctio eaque eligendi est eum ex, expedita fugiat illo incidunt ipsum iure iusto
        nihil odio perspiciatis porro quibusdam.</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/base.scss";

.modal {
  position: fixed;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: grid;
  grid-template-columns: 60% 40%;

  &__overlay {
    background: $overlay;
  }

  &__content {
    background: $white;
    padding: 1em;
  }

  &__btn--close {
    text-decoration: underline;
    margin-bottom: 0.5em;
  }

  &__btn--other {
    display: flex;
    gap: 1em;
    margin-bottom: 1.5em;
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 1.5em;
  }

  &__desc {
    font-size: 20px;
  }
}
</style>
