<script setup lang="ts">

import {Search} from "@element-plus/icons-vue";
import CardUser from "@/components/friends/card-user.vue";

const router = useRouter();
const authStore = useAuthStore();
const {createChat} = useChat();

const user = computed<any>(() => authStore.$state.user);
const users = computed<any>(() => authStore.$state.userList);

const valueInput = ref("");

const handleEnter = () => {

};

const handleCreateChat = async (value: any) => {
    const result = await createChat(value);

    if (result) await router.push(`/?chatId=${result.id}`);
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