<script setup lang="ts">

import {CirclePlus, MoreFilled, Search, VideoCamera} from "@element-plus/icons-vue";
import {ClickOutside as vClickOutside} from 'element-plus'
import MoreAction from "~/components/chat/list-message/more-action.vue";

const sizeIcon = 25;
const data = [
    {
        id: 0,
        name: "Ricky Smith",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
        visibleAction: false,
        action: {
            read: false,
            notification: false,
            block: false,
        }
    },
    {
        id: 1,
        name: "Stephanie Sharked",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        message: "YOU: Okay, Let's get the...",
        time: "1 min ago",
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
const popoverRef = ref();

const handleChange = (value: any) => {
    dataCopy.value = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
};

const handleClickItem = (value: number) => {
    isActive.value = value;
};

const handleClickMoreAction = (item: any) => {
    item.visibleAction = !item.visibleAction;
};

const onClickOutside = (event: any, item: any) => {
    item.visibleAction = false;
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
        
        <div class="content__list-message overflow-auto flex-1 p-1.5" id="scroll__list-message">
            <div v-for="item in dataCopy"
                 :key="item.id"
                 class="item__list-message flex items-center"
                 :class="isActive === item.id ? 'active' : ''"
                 v-click-outside="($event) => onClickOutside($event, item)"
                 @click="handleClickItem(item.id)"
            >
                <el-badge is-dot class="dot-badge mr-4">
                    <el-avatar
                        :src="item.avatar"
                        :size="45"
                        class="border"
                    />
                </el-badge>
                
                <div class="flex flex-col">
                    <p class="name__item__list-massage font-medium text-ellipsis whitespace-nowrap overflow-hidden">
                        {{ item.name }}
                    </p>
                    <div class="font-light text-sm text-gray-500 flex items-center">
                        <span class="message__item__list-message text-ellipsis whitespace-nowrap overflow-hidden">
                            {{ item.message }}
                        </span>
                        <span class="mx-1"> • </span>
                        <span>{{ item.time }}</span>
                    </div>
                </div>
                
                <el-popover
                    ref="popoverRef"
                    :visible="item.visibleAction"
                    placement="bottom"
                    :width="250">
                    <more-action :action="item.action"/>
                    
                    <template #reference>
                        <el-button
                            class="more-action flex items-center justify-center"
                            :class="item.visibleAction ? 'active__more-action' : ''"
                            @click.stop="handleClickMoreAction(item)">
                            <el-icon :size="14">
                                <MoreFilled/>
                            </el-icon>
                        </el-button>
                    </template>
                </el-popover>
            </div>
        </div>
        
        <div class="cover-bar"></div>
    </div>
</template>

<style lang="scss">
.header__list-message {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input-search__list-message {
    .el-input__wrapper {
        box-shadow: none;
        background: #f7f8f8;
        border-radius: 10px;
        -webkit-transition: background-color var(--el-transition-duration);
        
        &:hover {
            box-shadow: none;
            background: #eeefef;
        }
    }
}

.content__list-message {
    position: relative;
    
    .item__list-message {
        cursor: pointer;
        padding: 10px 15px;
        border-radius: 10px;
        -webkit-transition: background-color var(--el-transition-duration);
        
        .more-action {
            visibility: hidden;
            position: absolute;
            background-color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            right: 20px;
            box-shadow: var(--el-box-shadow-light);
            -webkit-transition: all .1ms;
        }
        
        &:hover {
            background-color: #f7f8f8;
            
            .more-action {
                visibility: visible;
            }
        }
        
        .active__more-action {
            visibility: visible;
        }
    }
    
    .dot-badge {
        .el-badge__content.is-fixed.is-dot {
            right: 10px;
        }
        
        .el-badge__content.is-fixed {
            top: 7px
        }
        
        .el-badge__content--danger {
            background-color: #5ad539;
        }
    }
    
    .active {
        background-color: #0f2132 !important;
        
        p {
            color: white;
        }
    }
    
    .name__item__list-massage {
        width: 210px;
    }
    
    .message__item__list-message {
        display: inline-block;
        max-width: 161px;
    }
}

#scroll__list-message::-webkit-scrollbar {
    width: .4em;
}

#scroll__list-message::-webkit-scrollbar,
#scroll__list-message::-webkit-scrollbar-thumb {
    overflow: visible;
    border-radius: 4px;
}

#scroll__list-message::-webkit-scrollbar-thumb {
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

/* MAGIC HAPPENS HERE */
.container__list-message:hover .cover-bar {
    opacity: 0;
    -webkit-transition: all .3s;
}
</style>