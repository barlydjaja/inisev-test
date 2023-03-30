<script lang="ts">
import CheckBox from "@/components/CheckBox.vue";
import { defineComponent } from 'vue'
import EmailContent from "@/components/EmailContent.vue";

export default defineComponent({
  components: {
    EmailContent,
    CheckBox,
  },
  methods: {
    onCheckboxClickAll() {
      this.$store.commit('markSelectedAll')
      this.$store.commit('toggleCheckedAll', true)
    },
    handleOpenModal(id: number) {
      this.$store.commit('toggleModal', id)
    },
    markRead() {
      this.currentMarkedEmails.forEach(markEmail => {
        this.$store.commit('markRead', markEmail.id)
        this.$store.commit('toggleCheckedAll', false)
      })
    },
    markArchive() {
      this.currentMarkedEmails.forEach(markEmail => {
        this.$store.commit('toArchive', markEmail.id)
      })
      this.$store.commit('toggleCheckedAll', false)
    },
    selectedCount() {
      return this.$store.state.emails.filter((email: { isSelected: boolean; }) => email.isSelected).length
    },
  },
  computed: {
    emailsInbox() {
      return this.$store.state.emails.filter((email: { isInbox: any; }) => email.isInbox)
    },
    currentMarkedEmails(): any {
      return this.$store.state.emails.filter(email => email.isSelected)
    },
    isCheckedAll(): boolean {
      return this.$store.state.isCheckedAll
    }
  },
})
</script>

<template>
  <nav class="inbox__navigation">
    <CheckBox :isChecked="isCheckedAll" @onCheckboxClick="onCheckboxClickAll"/>
    <button @click="markRead">Mark as read (r)</button>
    <button @click="markArchive">Archive (a)</button>
  </nav>
  <main class="inbox__content">
    <EmailContent v-for="email in emailsInbox"
                  :id="email.id"
                  :key="email.id"
                  :is-read='email.isRead'
                  :is-checked='email.isSelected'
                  :title="email.title"
                  @click="() => handleOpenModal(email.id)"/>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/base.scss";

.inbox__navigation {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 1em;
  margin-bottom: 1em;
  margin-left: 0.5em;
}

.inbox__content {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
