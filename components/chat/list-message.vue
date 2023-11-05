<script setup lang="ts">

import _ from "lodash"
import {CirclePlus, Search, VideoCamera} from "@element-plus/icons-vue";
import CardMessage from "@/components/chat/list-message/card-message.vue";
import {useChatStore} from "@/stores/chat";

const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();
const authStore = useAuthStore();
const {deleteChat} = useChat();

const chats = computed(() => chatStore.$state.chats);
const user = computed(() => authStore.$state.user);
const sizeIcon = 25;

const dataTable = computed({
    get() {
        return chats.value && chats.value.length > 0 ? chats.value : [];
    },
    set(value) {

    }
});

const valueInput = ref("");
const isActive = ref<any>(null);
const dataTableCopy = ref<any>(null);

watch(dataTable, (newValue) => {
    dataTableCopy.value = newValue && newValue.length > 0 ? newValue.map((item: any) => {
        return {
            ...item,
            visibleAction: false,
        }
    }) : [];
});

watch(() => route.query.chatId,
    async newId => {
        isActive.value = newId;
    }, {immediate: true}
);

const handleChange = (value: any) => {
    dataTable.value = dataTable.value.filter((item: any) => item.participant.userName.toLowerCase().includes(value.toLowerCase()))
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

// const handleClickItemMoreAction = _.debounce(async (key: any, item: any) => {
//     if (key === "delete") {
//         dataTable.value = dataTable.value.filter((i: any) => i.id !== item.id);
//         await deleteChat(item.id);
//         return;
//     }
//
//     // item.action[key] = !item.action[key];
// }, 200);

const filterFriend = (data: any) => {
    const temp = data.participants.find((x: any) => x.userID !== user.value.userID);
    return {
        ...temp,
        id: temp.userID,
        name: temp.userName,
        avatar: temp.photoUrl,
        online: temp.lastSeen,
        time: temp.lastSeen,
        action: data.action,
        updatedTime: data.updatedTime,
        visibleAction: data.visibleAction,
    };
};

const handleClickItemMoreAction = (key: any, item: any) => {
    ElMessageBox.confirm(
        'Do you wanna delete this chat conversation ?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            if (key === "delete") {
                dataTable.value = dataTable.value.filter((i: any) => i.id !== item.id);
                deleteChat(item.id);
                return;
            }
                // item.action[key] = !item.action[key];
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}

</script>

<template>
    <div class="container__list-message flex flex-col h-full relative">
        <div class="header__list-message px-5 pt-5">
            <p class="font-semibold text-2xl">Chats</p>
            <div class="flex">
                <el-icon :size="sizeIcon" class="mr-4 cursor-pointer">
                    <VideoCamera/>
                </el-icon>

                <el-icon :size="sizeIcon" class="cursor-pointer">
                    <CirclePlus/>
                </el-icon>
            </div>
        </div>

        <div class="input-search__list-message px-5">
            <el-input
                v-model="valueInput"
                class="w-full my-5"
                placeholder="Search Messenger"
                size="large"
                :prefix-icon="Search"
                @input="handleChange"
            />
        </div>

        <div v-if="dataTable && dataTable.length > 0"
             class="content__list-message overflow-auto flex-1 p-1.5"
             id="scroll__list-message">
            <card-message v-for="item in dataTableCopy"
                          :class="isActive === item.id ? 'active' : ''"
                          :key="item.id"
                          :data="filterFriend(item)"
                          @click="handleClickItem(item.id)"
                          @on-click-outside="onClickOutside(item)"
                          @on-click-more-action="handleClickMoreAction(item)"
                          @on-click-item-more-action="(key) => handleClickItemMoreAction(key, item)"/>
        </div>

        <NuxtLayout v-else name="error" class="flex-1"/>

        <div class="cover-bar"></div>
    </div>



</template>

<style lang="scss" src="@/assets/chat/list-message.scss"/>