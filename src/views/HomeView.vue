<script lang="ts">
import CheckBox from "@/components/CheckBox.vue";
import { defineComponent } from 'vue'
import EmailContent from "@/components/EmailContent.vue";
import MarkRead from "@/components/MarkRead.vue";
import MarkArchive from "@/components/MarkArchive.vue";

export default defineComponent({
  components: {
    MarkArchive,
    MarkRead,
    EmailContent,
    CheckBox,
  },
  methods: {
    onCheckboxClickAll() {
      this.$store.commit('markSelectedAll', {name: 'Inbox'})
      if (this.isCheckedAll) {
        this.$store.commit('toggleCheckedAll', false)
      } else {
        this.$store.commit('toggleCheckedAll', true)
      }
    },
    handleOpenModal(id: number) {
      this.$store.commit('toggleModal', id)
    },
    selectedCount() {
      return this.$store.state.emails.filter((email: { isSelected: boolean; }) => email.isSelected).length
    },
  },
  computed: {
    emailsInbox() {
      return this.$store.state.emails.filter((email: { isInbox: any; }) => email.isInbox)
    },
    isCheckedAll(): boolean {
      return this.$store.state.isCheckedAll
    }
  },
  created() {
    this.$store.commit('toggleCheckedAll', false)
    this.$store.commit('markSelectedAll', {name: 'Inbox', bool: false})
  }
})
</script>

<template>
  <nav class="inbox__navigation">
<!--    TODO: bug when selecting all but no email at current section-->
    <CheckBox :isChecked="isCheckedAll" @onCheckboxClick="onCheckboxClickAll"/>
    <MarkRead/>
    <MarkArchive/>
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
