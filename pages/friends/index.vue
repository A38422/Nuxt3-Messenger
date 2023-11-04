<script setup lang="ts">

import Friends from "@/components/friends/friends.vue";

const {getUserList} = useAuth();
const {getMessagesInChat, getChatList} = useChat();

getUserList();
getChatList();
getMessagesInChat();

</script>

<template>
    <friends />
</template>

<style scoped lang="scss">

</style>