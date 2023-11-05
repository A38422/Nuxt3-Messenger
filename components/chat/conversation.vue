<script setup lang="ts">

const route = useRoute();
const authStore = useAuthStore();
const chatStore = useChatStore();
const {sendMessage, getMessagesInChat} = useChat();

const user = computed<any>(() => authStore.$state.user);
const chats = computed<any>(() => chatStore.$state.chats);
const messages = computed<any>(() => chatStore.$state.messages);

const bottom = ref(null);
const friend = ref<any>(null);

watch(chats, (newValue) => {
    friend.value = user.value && newValue && newValue.length > 0 && newValue.find((i: any) => i.id === chatStore.$state.chatID) ?
        newValue.find((i: any) => i.id === chatStore.$state.chatID).participants.find((x: any) => x.userID !== user.value.userID)
        : null;
}, {deep: true, immediate: true});

watch(
    messages,
    () => {
        nextTick(() => {
            // @ts-ignore
            // bottom.value?.scrollIntoView({behavior: 'smooth'})
            bottom.value?.scrollIntoView();
        });
    },
    {deep: true}
)

watch(() => route.query.chatId,
    newId => {
        chatStore.setChatID(newId);
        getMessagesInChat();
    }, {immediate: true}
)

const send = (value: String) => {
    if (route.query && route.query.chatId && value) {
        sendMessage(route.query.chatId, value);
    }
};

</script>

<template>
    <section v-if="user && friend" class="chat-container overflow-hidden h-full w-full flex flex-col">
        <div class="chat-header px-6 py-4 flex flex-row justify-between items-center border-b-2 border-b-gray-100">
            <ChatConversationHeader :active="friend?.lastSeen" :avatar="friend?.photoUrl" :name="friend?.userName"/>
        </div>

        <div v-if="messages && messages.length > 0" class="chat-body p-4 flex-1 overflow-auto h-full">
            <ChatConversationMessage
                v-for="{ id, content, senderID, time } in messages"
                :key="id"
                :time="time"
                :name="friend?.userName"
                :photo-url="friend?.photoUrl"
                :sender="senderID === user.userID"
            >
                {{ content }}
            </ChatConversationMessage>

            <div ref="bottom"></div>
        </div>

        <div v-else class="chat-body p-4 flex-1 flex flex-col items-center justify-center h-full">
            <NuxtLayout name="error"/>
        </div>

        <div class="cover-bar"></div>

        <div class="chat-footer">
            <ChatConversationFooter @onEnter="send"/>
        </div>
    </section>

    <section v-else class="chat-container h-full w-full flex flex-col items-center justify-center">
        <NuxtLayout name="error"/>
    </section>
</template>

<style scoped lang="scss">
.chat-body::-webkit-scrollbar {
    width: .4em;
}

.chat-body::-webkit-scrollbar,
.chat-body::-webkit-scrollbar-thumb {
    overflow: visible;
    border-radius: 4px;
}

.chat-body::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .2);
}

.cover-bar {
    position: absolute;
    background: #ffffff;;
    height: 100%;
    top: 0;
    right: 0;
    width: .4em;
    -webkit-transition: all .5s;
    opacity: 1;
}
</style>