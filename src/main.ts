import {createApp} from 'vue'
import {createStore} from "vuex";
import App from './App.vue'
import router from './router'

import './assets/main.scss'

const store = createStore({
    state () {
        return {
            emails: [
                {
                    id: 1,
                    title: 'Your 7-figure plan goes bye-bye at midnight',
                    isRead: false,
                    isInbox: true,
                    isSelected: false,
                },
                {
                    id: 2,
                    title: '[WEEKEND ONLY] Get this NOW before',
                    isRead: false,
                    isInbox: true,
                    isSelected: false,
                },
                {
                    id: 3,
                    title: 'Uh-oh, your prescription is expiring',
                    isRead: true,
                    isInbox: true,
                    isSelected: false,
                }
            ],
            modal: {
                isOpen: false,
                emailId: 1,
            },
            isCheckedAll: false
        }
    },
    mutations: {
        toggleCheckedAll(state, bool) {
            state.isCheckedAll = bool
        },
        markRead(state, id) {
            const emailIdx = state.emails.findIndex(email => email.id === id)
            state.emails[emailIdx].isRead = true
            state.emails[emailIdx].isSelected = false
        },
        markSelected(state, id) {
            const emailIdx = state.emails.findIndex(email => email.id === id)
            state.emails[emailIdx].isSelected = !state.emails[emailIdx].isSelected
        },
        markSelectedAll(state) {
            if (state.emails.some(email => !email.isSelected)) {
                state.emails.forEach(email => email.isSelected = true)
            } else {
                state.emails.forEach(email => email.isSelected = false)
            }
        },
        toArchive(state, id) {
            const emailIdx = state.emails.findIndex(email => email.id === id)
            state.emails[emailIdx].isInbox = false
            state.emails[emailIdx].isSelected = false
        },
        toInbox(state, id) {
            const emailIdx = state.emails.findIndex(email => email.id === id)
            state.emails[emailIdx].isInbox = true
            state.emails[emailIdx].isSelected = false
        },
        toggleModal(state, id) {
            state.modal.isOpen = !state.modal.isOpen
            state.modal.emailId = id
        },
        closeModal(state) {
            state.modal.isOpen = false
            state.modal.emailId = 0
        }
    }
})

const app = createApp(App)

app.use(store).use(router)

app.mount('#app')
