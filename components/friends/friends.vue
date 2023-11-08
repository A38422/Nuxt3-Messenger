<script setup lang="ts">

import {Search} from "@element-plus/icons-vue";
import CardUser from "@/components/friends/card-user.vue";
import {useLoading} from "@/composables/states";
import type {TabsPaneContext} from "element-plus";

const router = useRouter();
const authStore = useAuthStore();
const chatStore = useChatStore();
const {createChat} = useChat();

const loading = useLoading();

const user = computed<any>(() => authStore.$state.user);
const users = computed<any>(() => authStore.$state.userList);

const valueInput = ref("");
const activeName = ref("friends");

const handleEnter = () => {

};

const handleCreateChat = async (value: any) => {
    loading.value = true;
    const result = await createChat(value);

    chatStore.setChatID(result.id);

    await setTimeout(async () => {
        if (result) await router.push({
            path: '/',
            query: {
                chatId: result.id
            },
        });
    }, 100);
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
    // console.log(tab, event)
};

</script>

<template>
    <div v-if="user" class="w-full h-full flex flex-col p-5">
        <div class="flex items-center justify-between pb-1">
            <p class="font-semibold text-xl">Friends</p>
            <div class="input-search__list-message w-1/4">
                <el-input v-model="valueInput"
                          class=""
                          placeholder="Search"
                          size="large"
                          :prefix-icon="Search"
                          @keyup.enter="handleEnter"/>
            </div>
        </div>

        <el-tabs v-model="activeName" class="w-full" @tab-click="handleClick">
            <el-tab-pane label="All friends" name="friends">
                <div class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in users"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                    </card-user>
                </div>
            </el-tab-pane>

            <el-tab-pane label="Friend requests" name="friends-request">
                <div class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in users"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                    </card-user>
                </div>
            </el-tab-pane>

            <el-tab-pane label="Invitation sent" name="invitation-sent">
                <div class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in users"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                    </card-user>
                </div>
            </el-tab-pane>

            <el-tab-pane label="Other" name="Other">
                <div class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in users"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                    </card-user>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>

    <NuxtLayout v-else name="error" class="w-full h-full flex flex-col"/>
</template>

<style scoped lang="scss">

</style>