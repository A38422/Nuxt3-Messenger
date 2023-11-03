<script setup lang="ts">

import _ from "lodash"
import {CirclePlus, Search, VideoCamera} from "@element-plus/icons-vue";
import CardMessage from "@/components/chat/list-message/card-message.vue";
import {useChatStore} from "@/stores/chat";

const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();
const {getChatList} = useChat();
getChatList();

const chats = computed(() => chatStore.chats);
const sizeIcon = 25;

const dataTable = ref<any>([]);
const valueInput = ref("");
const isActive = ref<any>(null);

watch(chats, (newChats) => {
    dataTable.value = newChats.map((item: any) => {
        return {
            ...item,
            visibleAction: false,
        }
    });
}, {deep: true});

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

const handleClickItemMoreAction = _.debounce((key: any, item: any) => {
    if (key === "delete") {
        dataTable.value = dataTable.value.filter(i => i.id !== item.id);
        return;
    }

    item.action[key] = !item.action[key];
}, 200);

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

        <div v-if="dataTable && dataTable.length > 0" class="content__list-message overflow-auto flex-1 p-1.5"
             id="scroll__list-message">
            <card-message v-for="item in dataTable"
                          :class="isActive === item.id ? 'active' : ''"
                          :id="item.id"
                          :key="item.id"
                          :name="item.participant.userName"
                          :online="item.participant.lastSeen"
                          :avatar="item.participant.photoUrl"
                          :action="item.action"
                          :messages="item.Messages"
                          :visible-action="item.visibleAction"
                          @click="handleClickItem(item.id)"
                          @on-click-outside="onClickOutside(item)"
                          @on-click-more-action="handleClickMoreAction(item)"
                          @on-click-item-more-action="(key) => handleClickItemMoreAction(key, item)"/>
        </div>

        <div class="cover-bar"></div>
    </div>
</template>

<style lang="scss" src="@/assets/chat/list-message.scss"/>