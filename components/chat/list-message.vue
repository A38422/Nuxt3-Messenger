<script setup lang="ts">

import {CirclePlus, Search, VideoCamera} from "@element-plus/icons-vue";
import CardMessage from "@/components/chat/list-message/card-message.vue";
import {useLoading} from "@/composables/states";

const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();
const authStore = useAuthStore();
const {deleteChat, updateChat} = useChat();
const loading = useLoading();
const {isDarkMode} = userDarkMode();

const chats = computed(() => chatStore.$state.chats);
const user = computed(() => authStore.$state.user);
const users = computed(() => authStore.$state.userList);

const sizeIcon = 25;

const valueInput = ref("");
const isActive = ref<any>(null);
const dataTable = ref<any>([]);

watch(chats, (newValue) => {
    dataTable.value = newValue && newValue.length > 0 ? newValue.map((item: any) => {
        return {
            ...item,
            visibleAction: false,
        }
    }) : [];
}, {deep: true, immediate: true});

watch(() => route.query.chatId,
    newId => {
        isActive.value = newId;
    }, {immediate: true}
);

const handleChange = (value: any) => {
    dataTable.value = chats.value && chats.value.length > 0 ? chats.value
        .filter((i: any) => {
            return i.participants.find((x: any) => x.userID !== user.value.userID
                && x.userName.toLowerCase().includes(value.toLowerCase()));
        })
        .map((o: any) => {
            return {
                ...o,
                visibleAction: false,
            }
        }) : [];
};

const handleClickItem = (value: any) => {
    router.push(`/?chatId=${value}`)
};

const handleClickMoreAction = (item: any) => {
    item.visibleAction = !item.visibleAction;
};

const onClickOutside = (item: any) => {
    item.visibleAction = false;
};

const filterFriend = (data: any) => {
    if (data && data.participants && user.value) {
        const friend = data.participants.find((x: any) => x.userID !== user.value.userID);

        const temp: any = users.value.find((i: any) => i.userID === friend.userID);

        return {
            ...temp,
            id: temp.userID,
            name: temp.userName,
            avatar: temp.photoUrl,
            online: temp.lastSeen,
            Messages: data.Messages,
            action: data.action,
            updatedTime: data.updatedTime,
            visibleAction: data.visibleAction,
        };
    }
};

const handleClickItemMoreAction = (key: any, item: any) => {
    if (key === "delete") {
        ElMessageBox.confirm(
            'Do you wanna delete this chat conversation?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        ).then(() => {
            dataTable.value = dataTable.value.filter((i: any) => i.id !== item.id);
            deleteChat(item.id);

            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        });
        return;
    }

    if (key === 'read') {
        updateChat(item.id, {
            read: !item.action[key],
            notification: false,
        });
    } else {
        item.action[key] = !item.action[key];
    }
};

const handleNewChat = () => {
    loading.value = true;

    setTimeout(() => {
        router.push('/friends');
    }, 100);
};

</script>

<template>
    <div class="container__list-message flex flex-col h-full relative">
        <div class="header__list-message px-5 pt-5">
            <p class="font-semibold text-2xl">Chats</p>
            <div class="flex">
                <el-icon :size="sizeIcon" class="mr-4 cursor-pointer">
                    <VideoCamera/>
                </el-icon>

                <el-icon :size="sizeIcon" class="cursor-pointer" @click="handleNewChat">
                    <CirclePlus/>
                </el-icon>
            </div>
        </div>

        <div class="input-search__list-message px-5">
            <el-input
                v-model="valueInput"
                class="w-full my-5"
                placeholder="Search Infinity"
                size="large"
                :prefix-icon="Search"
                @input="handleChange"
            />
        </div>

        <div v-if="dataTable && dataTable.length > 0 && user"
             class="content__list-message overflow-auto flex-1 p-1.5"
             id="scroll__list-message">
            <card-message v-for="item in dataTable"
                          :class="isActive === item.id ? 'active' : ''"
                          :key="item.id"
                          :data="filterFriend(item)"
                          @click="handleClickItem(item.id)"
                          @on-click-outside="onClickOutside(item)"
                          @on-click-more-action="handleClickMoreAction(item)"
                          @on-click-item-more-action="(key) => handleClickItemMoreAction(key, item)"/>
        </div>

        <NuxtLayout v-else name="error" class="flex-1"/>

        <div class="cover-bar" :class="isDarkMode ? 'dark' : ''"></div>
    </div>


</template>

<style lang="scss" src="@/assets/chat/list-message.scss"/>