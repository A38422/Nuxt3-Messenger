<script setup lang="ts">
import {MoreFilled, MuteNotification} from "@element-plus/icons-vue";
import {ClickOutside as vClickOutside} from 'element-plus';
import MoreAction from "@/components/chat/list-message/more-action.vue";

const emits = defineEmits(["onClickOutside", "onClickMoreAction", "onClickItemMoreAction"]);
const props = defineProps({
    id: {
        type: Number,
        default: null
    },
    name: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
    online: {
        type: Boolean,
        default: false
    },
    time: {
        type: String,
        default: ""
    },
    action: {
        type: Object,
        default: {
            read: false,
            notification: false,
            block: false
        }
    },
    visibleAction: {
        type: Boolean,
        default: false
    }
});

const popoverRef = ref();

const handleClickMoreAction = () => {
    emits("onClickMoreAction");
};

const onClickOutside = () => {
    emits("onClickOutside");
};

const handleClickItemMoreAction = (key: string) => {
    emits("onClickItemMoreAction", key);
};
</script>

<template>
    <div class="item__list-message flex items-center"
         v-click-outside="onClickOutside">
        <el-badge :is-dot="online" class="dot-badge mr-4">
            <el-avatar
                :src="avatar"
                :size="45"
                class="border"
            />
        </el-badge>

        <div class="flex flex-col">
            <p class="name__item__list-massage font-medium text-ellipsis whitespace-nowrap overflow-hidden">
                {{ name }}
            </p>
            <div class="font-light text-sm text-gray-500 flex items-center"
                 :class="action?.read ? 'font-semibold text-black' : ''">
                    <span class="message__item__list-message text-ellipsis whitespace-nowrap overflow-hidden">
                        <slot/>
                    </span>
                <span class="mx-1"> • </span>
                <span>{{ time }}</span>
            </div>
        </div>

        <el-icon v-if="action?.notification"
                 :size="22"
                 :color="'#808080'"
                 class="ml-4">
            <MuteNotification/>
        </el-icon>

        <el-popover
            ref="popoverRef"
            :visible="visibleAction"
            placement="bottom"
            :width="250">
            <more-action :action="action"
                         @on-click-item="(key) => handleClickItemMoreAction(key)"/>

            <template #reference>
                <el-button
                    class="more-action flex items-center justify-center"
                    :class="visibleAction ? 'active__more-action' : ''"
                    @click.stop="handleClickMoreAction">
                    <el-icon :size="14">
                        <MoreFilled/>
                    </el-icon>
                </el-button>
            </template>
        </el-popover>
    </div>
</template>