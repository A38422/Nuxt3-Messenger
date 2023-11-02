<script setup lang="ts">
const data = ref({
    id: 0,
    name: "Ricky Smith",
    avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    message: "YOU: Okay, Let's get the...",
    time: "1 min ago",
    online: false,
    active: "Active 1h ago",
    visibleAction: false,
    action: {
        read: false,
        notification: true,
        block: true,
    }
});
const {user, isLogin} = useAuth();
const {getMessagesInChat, sendMessage} = useChat();
const bottom = ref(null);
const messages = ref([]);
const message = ref(getMessagesInChat("111"));

onMounted(() => {
    // @ts-ignore
    bottom.value?.scrollIntoView();
})

watch(
    messages,
    () => {
        nextTick(() => {
            // @ts-ignore
            bottom.value?.scrollIntoView({behavior: 'smooth'})
        });
    },
    {deep: true}
)

const send = (value: String) => {
    sendMessage("111", value);
};
</script>

<template>
    <section v-if="isLogin" class="chat-container overflow-hidden h-full w-full flex flex-col">
        <div class="chat-header px-6 py-4 flex flex-row justify-between items-center border-b-2 border-b-gray-100">
            <ChatConversationHeader :active="data.active" :avatar="data.avatar" :name="data.name"/>
        </div>

        <div v-if="message && message.length > 0" class="chat-body p-4 flex-1 overflow-auto h-full">
            <ChatConversationMessage
                v-for="{ id, text, userPhotoURL, userName, userId } in messages"
                :key="id"
                :name="userName"
                :photo-url="userPhotoURL"
                :sender="userId === user?.uid"
            >
                {{ text }}
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