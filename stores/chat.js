import { defineStore } from "pinia";

export const useChatStore = defineStore('chat', {
    state: () => {
        return {
            chatID: null,
            chats: [],
            messages: [],
        }
    },
    getters: {
        getChatID: state => state.chatID,
        getChats: state => state.chats,
        getMessages: state => state.messages,
    },
    actions: {
        setChatID(data) {
            this.$state.chatID = data;
        },
        setChats(data) {
            this.$state.chats = data;
        },
        setMessages(data) {
            this.$state.messages = data;
        },
        clearChat() {
            this.$state.chatID = null;
            this.$state.chats = [];
            this.$state.messages = [];
        },
    },
})
