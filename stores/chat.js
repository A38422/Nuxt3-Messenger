import { defineStore } from "pinia";

export const useChatStore = defineStore('chat', {
    state: () => {
        return {
            chats: [],
            messages: [],
        }
    },
    getters: {
        getChats: state => state.chats,
        getMessages: state => state.messages,
    },
    actions: {
        setChats(data) {
            this.$state.chats = data;
        },
        setMessages(data) {
            this.$state.messages = data;
        }
    },
})
