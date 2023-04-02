<script lang="ts">
import CheckBox from "@/components/CheckBox.vue";
import { defineComponent } from 'vue'
import EmailContent from "@/components/EmailContent.vue";
import MarkRead from "@/components/MarkRead.vue";
import MarkInbox from "@/components/MarkInbox.vue";
import {mapMutations, mapState} from "vuex";
import type {IStore} from "@/interface/store.interface";

export default defineComponent({
  components: {
    MarkInbox,
    MarkRead,
    EmailContent,
    CheckBox,
  },
  methods: {
    ...mapMutations([
        'markSelectedAll',
        'toggleCheckedAll',
        'toggleModal'
    ]),
    onCheckboxClickAll() {
      this.markSelectedAll({name: 'Archive'})
      if (this.isCheckedAll) {
        this.toggleCheckedAll(false)
      } else {
        this.toggleCheckedAll(true)
      }
    },
    handleOpenModal(id: number) {
      this.toggleModal(id)
    },
  },
  computed: mapState({
    emailsArchived({emails}: IStore) {
      return emails.filter((email: { isInbox: boolean; }) => !email.isInbox)
    },
    isCheckedAll({isCheckedAll}: IStore): boolean {
      return isCheckedAll
    }
  }),
  created() {
    this.toggleCheckedAll(false)
    this.markSelectedAll({name: 'Archive', bool: false})
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
