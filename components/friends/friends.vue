<script setup lang="ts">

import {Search} from "@element-plus/icons-vue";
import CardUser from "@/components/friends/card-user.vue";
import {useLoading} from "@/composables/states";

const router = useRouter();
const authStore = useAuthStore();
const chatStore = useChatStore();
const {createChat, getMessagesInChat} = useChat();

const user = computed<any>(() => authStore.$state.user);
const users = computed<any>(() => authStore.$state.userList);

const valueInput = ref("");
const loading = useLoading();

const handleEnter = () => {

};

const handleCreateChat = async (value: any) => {
    loading.value = true;
    const result = await createChat(value);

    chatStore.setChatID(result.id);
    getMessagesInChat(result.id);

    await setTimeout(async () => {
        if (result) await router.push({
            path: '/',
            query: {
                chatId: result.id
            },
        });
    }, 150);
};

</script>

<template>
    <div v-if="user" class="w-full h-full flex flex-col p-5">
        <div class="input-search__list-message w-1/3 mx-auto pb-5">
            <el-input v-model="valueInput"
                      class=""
                      placeholder="Search Friend"
                      size="large"
                      :prefix-icon="Search"
                      @keyup.enter="handleEnter"/>
        </div>

        <div class="w-full overflow-auto flex flex-wrap gap-4">
            <card-user v-for="item in users"
                       :key="item.userID"
                       :user="item"
                       @on-create-chat="handleCreateChat">
            </card-user>
        </div>
    </div>
    <NuxtLayout v-else name="error" class="w-full h-full flex flex-col"/>
</template>

<style scoped lang="scss">

</style>