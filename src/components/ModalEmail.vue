<script lang="ts">
import {defineComponent} from "vue";
import MarkRead from "@/components/MarkRead.vue";
import MarkArchive from "@/components/MarkArchive.vue";
import MarkInbox from "@/components/MarkInbox.vue";

export default defineComponent({
  components: {MarkInbox, MarkArchive, MarkRead},
  methods: {
    handleCloseModal() {
      this.$store.commit('toggleModal', 0)
    },
  },
  computed: {
    emailDetails() {
      return this.$store.state.emails.find((email: { id: number; }) => email.id === this.$store.state.modal.emailId)
    },
  }
})
</script>

<template>
  <div class="modal">
    <div class="modal__overlay" @click="handleCloseModal"/>
    <div class="modal__content" @click="handleCloseModal">
      <div class="modal__btn--close">Close (Esc)</div>
      <div class="modal__btn--other">
        <MarkRead/>
        <MarkArchive v-if="emailDetails.isInbox"/>
        <MarkInbox v-else/>
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
