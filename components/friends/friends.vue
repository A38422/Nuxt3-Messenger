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
const friends = computed<any>(() => authStore.$state.friendList);

const valueInput = ref("");
const activeName = ref("friends");
const dataTable = ref<any>([]);

watch(friends, newValue => {
    if (user.value && activeName.value === "friends") {
        dataTable.value = newValue.map((i: any) => {
            return users.value.find((x: any) => x.userID === i);
        });
    }
}, {deep: true, immediate: true})

const handleSearch = () => {

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
    if (activeName.value === tab.paneName || !user.value) return;

    switch (tab.paneName) {
        case "friends":
            dataTable.value = friends.value.map((i: any) => {
                return users.value.find((x: any) => x.userID === i);
            });
            break;
        case "friends-request":
            dataTable.value = [];
            break;
        case "invitation-sent":
            dataTable.value = [];
            break;
        case "other":
            dataTable.value = [...users.value];
            break;
    }
};

const handleAddFriend = () => {

};

const handleUnfriend = () => {

};

const handleAccepted = () => {

};

const handleRejected = () => {

};

const handleCancelRequest = () => {

};

</script>

<template>
    <div class="w-full h-full flex flex-col p-5">
        <div class="flex items-center justify-between pb-1">
            <p class="font-semibold text-xl">Friends</p>
            <div class="input-search__list-message w-1/4">
                <el-input v-model="valueInput"
                          placeholder="Search"
                          size="large"
                          :prefix-icon="Search"
                          @keyup.enter="handleSearch"/>
            </div>
        </div>

        <el-tabs v-model="activeName" class="w-full" @tab-click="handleClick">
            <el-tab-pane label="All friends" name="friends">
                <div v-if="user && dataTable && dataTable.length > 0"
                     class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in dataTable"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                        <el-button @click="handleUnfriend">
                            Unfriend
                        </el-button>
                    </card-user>
                </div>
                <NuxtLayout v-else name="error" class="flex items-center"/>
            </el-tab-pane>

            <el-tab-pane label="Friend requests" name="friends-request">
                <div v-if="user && dataTable && dataTable.length > 0"
                     class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in dataTable"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                        <el-button @click="handleAccepted">
                            Accept
                        </el-button>
                        <el-button @click="handleRejected">
                            Reject
                        </el-button>
                    </card-user>
                </div>
                <NuxtLayout v-else name="error" class="flex items-center"/>
            </el-tab-pane>

            <el-tab-pane label="Invitation sent" name="invitation-sent">
                <div v-if="user && dataTable && dataTable.length > 0"
                     class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in dataTable"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                        <el-button @click="handleCancelRequest">
                            Cancel request
                        </el-button>
                    </card-user>
                </div>
                <NuxtLayout v-else name="error" class="flex items-center"/>
            </el-tab-pane>

            <el-tab-pane label="Other" name="other">
                <div v-if="user && dataTable && dataTable.length > 0"
                     class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in users"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                        <el-button @click="handleAddFriend">
                            Add friend
                        </el-button>
                    </card-user>
                </div>
                <NuxtLayout v-else name="error" class="flex items-center"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">

</style>