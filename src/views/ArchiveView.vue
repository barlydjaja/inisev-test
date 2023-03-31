<script lang="ts">
import CheckBox from "@/components/CheckBox.vue";
import { defineComponent } from 'vue'
import EmailContent from "@/components/EmailContent.vue";
import MarkRead from "@/components/MarkRead.vue";
import MarkInbox from "@/components/MarkInbox.vue";

export default defineComponent({
  components: {
    MarkInbox,
    MarkRead,
    EmailContent,
    CheckBox,
  },
  methods: {
    onCheckboxClickAll() {
      this.$store.commit('markSelectedAll', {name: 'Archive'})
      if (this.isCheckedAll) {
        this.$store.commit('toggleCheckedAll', false)
      } else {
        this.$store.commit('toggleCheckedAll', true)
      }
    },
    handleOpenModal(id: number) {
      this.$store.commit('toggleModal', id)
    },
  },
  computed: {
    emailsArchived() {
      return this.$store.state.emails.filter((email: { isInbox: boolean; }) => !email.isInbox)
    },
    isCheckedAll(): boolean {
      return this.$store.state.isCheckedAll
    }
  },
  created() {
    this.$store.commit('toggleCheckedAll', false)
    this.$store.commit('markSelectedAll', {name: 'Archive', bool: false})
  }
})
</script>

<template>
  <nav class="inbox__navigation">
    <CheckBox :isChecked="isCheckedAll" @onCheckboxClick="onCheckboxClickAll"/>
    <MarkRead/>
    <MarkInbox/>
  </nav>
  <main class="inbox__content">
    <EmailContent v-for="email in emailsArchived"
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
