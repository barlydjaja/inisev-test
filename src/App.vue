<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavButton from "@/components/NavButton.vue";
import {defineComponent} from "vue";
import Modal from "@/components/ModalEmail.vue";
import {mapMutations, mapState} from "vuex";
import type {IMail, IStore} from "@/interface/store.interface";
export default defineComponent({
  components: {Modal, NavButton, RouterLink, RouterView},
  methods: {
    ...mapMutations([
        'markRead',
        'toggleCheckedAll',
        'toArchive',
        'toInbox',
        'closeModal'
    ]),
    markReadMail(id?: number) {
      if (typeof id === 'number') {
        this.markRead(id)
        this.toggleCheckedAll(false)
        this.closeModal()
        return
      }
      this.currentMarkedEmails.forEach(markEmail => {
        this.markRead(markEmail.id)
        this.toggleCheckedAll(false)
      })
    },
    markArchive(id?: number) {
      if (typeof id === 'number') {
        this.toArchive(id)
        this.toggleCheckedAll(false)
        this.closeModal()
        return
      }
      this.currentMarkedEmails.forEach((markEmail: { id: number; }) => {
        this.toArchive(markEmail.id)
        this.toggleCheckedAll(false)
      })
    },
    markInbox(id?: number) {
      if (typeof id === 'number') {
        this.toInbox(id)
        this.toggleCheckedAll(false)
        this.closeModal()
        return
      }
      this.currentMarkedEmails.forEach((markEmail: { id: number; }) => {
        this.toInbox(markEmail.id)
        this.toggleCheckedAll(false)
      })
    },
  },
  computed: mapState({
    inboxCount({emails}: IStore) {
      return emails.filter((email: { isInbox: boolean; }) => email.isInbox).length
    },
    archiveCount({emails}: IStore) {
      return emails.filter((email: { isInbox: boolean; }) => !email.isInbox).length
    },
    isModalOpen({modal}: IStore) {
      return modal.isOpen
    },
    selectedCount({emails}: IStore) {
      return emails.filter((email: { isSelected: boolean; }) => email.isSelected).length
    },
    currentMarkedEmails({emails}: IStore) {
      return emails.filter((email: { isSelected: boolean; }) => email.isSelected)
    },
    emailDetails({emails, modal}: IStore): IMail {
      return emails.find((email: { id: number; }) => email.id === modal.emailId) as IMail
    },
  }),
  created() {
    window.addEventListener('keyup', (event) => {
      const {key} = event
      if (!this.isModalOpen) {
        switch (key) {
          case 'r': this.markReadMail()
            return
          case 'a': this.markArchive()
            return
          case 'i': this.markInbox()
            return
        }
      } else {
        switch (key) {
          case 'r': this.markReadMail(this.emailDetails.id)
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
