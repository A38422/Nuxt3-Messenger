<script setup lang="ts">

import moment from "moment";

const route = useRoute();
const authStore = useAuthStore();
const chatStore = useChatStore();
const {sendMessage} = useChat();

const user = computed<any>(() => authStore.$state.user);
const users = computed<any>(() => authStore.$state.userList);
const chats = computed<any>(() => chatStore.$state.chats);

const bottom = ref(null);
const friend = ref<any>(null);
const messages = ref<any>([]);

watch(chats, (newValue) => {
    if (chatStore.$state.chatID && newValue.find((i: any) => i.id === chatStore.$state.chatID)) {
        // get friend
        const temp = newValue.find((i: any) => i.id === chatStore.$state.chatID).participants
            .find((x: any) => user.value && x.userID !== user.value.userID);
        friend.value = users.value.find((i: any) => i.userID === temp.userID);

        // get messages
        messages.value = newValue.find((i: any) => i.id === chatStore.$state.chatID).Messages;
    } else {
        friend.value = null;
    }
}, {deep: true, immediate: true});

watch(users, async newUsers => {
    if (chatStore.$state.chatID && chats.value.find((i: any) => i.id === chatStore.$state.chatID)) {
        // get friend
        const temp = chats.value.find((i: any) => i.id === chatStore.$state.chatID).participants
            .find((x: any) => user.value && x.userID !== user.value.userID);
        friend.value = newUsers.find((i: any) => i.userID === temp.userID);

        // get messages
        messages.value = chats.value.find((i: any) => i.id === chatStore.$state.chatID).Messages;
    } else {
        friend.value = null;
        messages.value = [];
    }
}, {deep: true});

watch(
    messages,
    () => {
        nextTick(() => {
            // @ts-ignore
            // bottom.value?.scrollIntoView({behavior: 'smooth'})
            bottom.value?.scrollIntoView();
        });

        // get friend
        if (chatStore.$state.chatID && chats.value.find((i: any) => i.id === chatStore.$state.chatID)) {
            const temp = chats.value.find((i: any) => i.id === chatStore.$state.chatID).participants
                .find((x: any) => user.value && x.userID !== user.value.userID);
            friend.value = users.value.find((i: any) => i.userID === temp.userID);
        } else {
            friend.value = null;
        }
    },
    {deep: true, immediate: true}
)

watch(() => route.query.chatId,
    newId => {
        chatStore.setChatID(newId);

        // get messages
        if (chatStore.$state.chatID && chats.value.find((i: any) => i.id === chatStore.$state.chatID)) {
            messages.value = chats.value.find((i: any) => i.id === chatStore.$state.chatID).Messages;
        } else {
            messages.value = [];
        }
    }, {immediate: true}
)

const send = (content: String) => {
    if (route.query && route.query.chatId && content) {
        sendMessage(
            route.query.chatId,
            content,
            friend.value.userName,
            friend.value.tokenDevice || '',
            friend.value.photoUrl
        );
    }
};

const checkTimeVisible = (index: any) => {
    if (messages.value[index] && messages.value[index - 1]) {
        const timeDifference = Math.abs(messages.value[index].timestamp.seconds * 1000 - messages.value[index - 1].timestamp.seconds * 1000);
        const fiveMinutesInMilliseconds = 5 * 60 * 1000;

        return timeDifference > fiveMinutesInMilliseconds;
    }
    return true;
};

const formatDate = (value: any) => {
    if (value && value.seconds)
        return moment(+value.seconds * 1000).format('ddd h:mm A');
    return "";
};

onUnmounted(() => {
    messages.value = [];
    bottom.value = null;
    friend.value = null;
    chatStore.setChatID(null);
});

</script>

<template>
    <section v-if="user && friend" class="chat-container overflow-hidden h-full w-full flex flex-col">
        <div class="chat-header px-6 py-4 flex flex-row justify-between items-center border-b-2 border-b-gray-100 dark:border-b-slate-700">
            <ChatConversationHeader :active="friend?.lastSeen" :avatar="friend?.photoUrl" :name="friend?.userName"/>
        </div>

        <div v-if="messages && messages.length > 0" class="chat-body p-4 flex-1 overflow-auto h-full">
            <ChatConversationMessage
                v-for="({ id, content, senderID, timestamp }, index) in messages"
                :key="id"
                :time="timestamp"
                :name="friend?.userName"
                :content="content"
                :photo-url="friend?.photoUrl"
                :sender="senderID === user.userID"
            >
                <p v-if="checkTimeVisible(index)" class="p-4 text-center text-sm text-gray-500">{{ formatDate(timestamp) }}</p>
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