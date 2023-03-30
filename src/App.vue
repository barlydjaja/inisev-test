<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavButton from "@/components/NavButton.vue";
import {defineComponent} from "vue";
import Modal from "@/components/ModalEmail.vue";
export default defineComponent({
  components: {Modal, NavButton, RouterLink, RouterView},
  methods: {
    markRead(id?: number) {
      if (typeof id === 'number') {
        this.$store.commit('markRead', id)
        this.$store.commit('toggleCheckedAll', false)
        this.closeModal()
        return
      }
      this.currentMarkedEmails.forEach(markEmail => {
        this.$store.commit('markRead', markEmail.id)
        this.$store.commit('toggleCheckedAll', false)
      })
    },
    markArchive(id?: number) {
      if (typeof id === 'number') {
        this.$store.commit('toArchive', id)
        this.$store.commit('toggleCheckedAll', false)
        this.closeModal()
        return
      }
      this.currentMarkedEmails.forEach(markEmail => {
        this.$store.commit('toArchive', markEmail.id)
        this.$store.commit('toggleCheckedAll', false)
      })
    },
    markInbox(id?: number) {
      if (typeof id === 'number') {
        this.$store.commit('toInbox', id)
        this.$store.commit('toggleCheckedAll', false)
        this.closeModal()
        return
      }
      this.currentMarkedEmails.forEach((markEmail: { id: number; }) => {
        this.$store.commit('toInbox', markEmail.id)
        this.$store.commit('toggleCheckedAll', false)
      })
    },
    closeModal() {
      this.$store.commit('closeModal')
    }
  },
  computed: {
    inboxCount() {
      return this.$store.state.emails.filter((email: { isInbox: boolean; }) => email.isInbox).length
    },
    archiveCount() {
      return this.$store.state.emails.filter((email: { isInbox: boolean; }) => !email.isInbox).length
    },
    isModalOpen() {
      return this.$store.state.modal.isOpen
    },
    selectedCount() {
      return this.$store.state.emails.filter((email: { isSelected: boolean; }) => email.isSelected).length
    },
    currentMarkedEmails() {
      return this.$store.state.emails.filter(email => email.isSelected)
    },
    emailDetails() {
      return this.$store.state.emails.find((email: { id: number; }) => email.id === this.$store.state.modal.emailId)
    },
  },
  created() {
    window.addEventListener('keyup', (event) => {
      const {key} = event
      if (!this.isModalOpen) {
        switch (key) {
          case 'r': this.markRead()
            return
          case 'a': this.markArchive()
            return
          case 'i': this.markInbox()
            return
        }
      } else {
        switch (key) {
          case 'r': this.markRead(this.emailDetails.id)
            return
          case 'a':
            if (this.$route.name === 'Inbox') this.markArchive(this.emailDetails.id)
            return
          case 'i':
            if (this.$route.name === 'Archive') this.markInbox(this.emailDetails.id)
            return
          case 'Escape': this.closeModal()
            return

        }
      }
    }, false)
  }
})

</script>

<template>
    <div class="container">
      <nav class="navigation">
        <div class="navigation__top">
          <RouterLink to="/">
            <NavButton text="Inbox" :count="inboxCount" />
          </RouterLink>
          <RouterLink to="/archive">
            <NavButton text="Archive" :count="archiveCount" />
          </RouterLink>
        </div>
        <div class="navigation__bottom">
            <NavButton text="Logout"/>
        </div>
      </nav>

<!--      main content-->
      <main class="content">
        <div class="content__title">{{ $route.name }}</div>
        <div class="content__description">
          Emails selected
          <span>({{ selectedCount }})</span>
        </div>
        <RouterView />
      </main>
    </div>

  <Teleport to="body">
    <Modal v-if="isModalOpen"/>
  </Teleport>
</template>

<style scoped lang="scss">
@import "@/assets/base.scss";
.container {
  height: 100vh;
  display: grid;
  grid-template-columns: 30% 70%;

  .navigation {
    background: $grey;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &__top {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      width: 100%;
    }

    &__bottom {
      width: 100%;
    }
  }

  .content {
    padding: 1em 2em;

    &__title {
      font-size: 24px;
      margin-bottom: 0.5em;
    }

    &__description {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 1em;
    }
  }
}
</style>
