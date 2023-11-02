<script setup lang="ts">
import _ from "lodash"
import {CirclePlus, Search, VideoCamera} from "@element-plus/icons-vue";
import CardMessage from "@/components/chat/list-message/card-message.vue";

const sizeIcon = 25;
const data = [
    {
        id: 0,
        name: "Ricky Smith",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: false,
        visibleAction: false,
        action: {
            read: false,
            notification: true,
            block: true,
        }
    },
    {
        id: 1,
        name: "Stephanie Sharked",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: false,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 2,
        name: "Rodger Struck",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: true,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 3,
        name: "Jerry Helper",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: true,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 4,
        name: "James Hall",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: false,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 5,
        name: "Lorri Work",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: true,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 6,
        name: "Frances Swan",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: false,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 7,
        name: "Stephanie Nicol",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: true,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 8,
        name: "Kathy Pacheco",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: false,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 9,
        name: "Mary Freud",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: false,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 10,
        name: "Sdafasfsdafsdaf fsa fasd fafs fsafasf saff af afas fas fasf",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the at the moment af af asf fafa faf afasfasfas faf ",
        time: "1 min ago",
        online: true,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 11,
        name: "Kevin Han",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: true,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 12,
        name: "John Smile",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: false,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 13,
        name: "Harry Poster",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: false,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 14,
        name: "Spider Man",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        online: true,
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
]

const dataCopy = ref(data);
const valueInput = ref("");
const isActive = ref(0);

const handleChange = (value: any) => {
    dataCopy.value = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
};

const handleClickItem = (value: number) => {
    isActive.value = value;
};

const handleClickMoreAction = (item: any) => {
    item.visibleAction = !item.visibleAction;
};

const onClickOutside = (item: any) => {
    item.visibleAction = false;
};

const handleClickItemMoreAction = _.debounce((key: any, item: any) => {
    if (key === "delete") {
        dataCopy.value = dataCopy.value.filter(i => i.id !== item.id);
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

        <div class="content__list-message overflow-auto flex-1 p-1.5"
             id="scroll__list-message">
            <card-message v-for="item in dataCopy"
                          :class="isActive === item.id ? 'active' : ''"
                          :id="item.id"
                          :key="item.id"
                          :name="item.name"
                          :time="item.time"
                          :online="item.online"
                          :avatar="item.avatar"
                          :action="item.action"
                          :visible-action="item.visibleAction"
                          @click="handleClickItem(item.id)"
                          @on-click-outside="onClickOutside(item)"
                          @on-click-more-action="handleClickMoreAction(item)"
                          @on-click-item-more-action="(key) => handleClickItemMoreAction(key, item)">
                {{ item.message }}
            </card-message>
        </div>

        <div class="cover-bar"></div>
    </div>
</template>

<style lang="scss" src="@/assets/chat/list-message.scss"/>