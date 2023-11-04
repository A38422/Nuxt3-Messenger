<script setup lang="ts">
import {MoreFilled, MuteNotification} from "@element-plus/icons-vue";
import {ClickOutside as vClickOutside} from 'element-plus';
import MoreAction from "@/components/chat/list-message/more-action.vue";

const emits = defineEmits(["onClickOutside", "onClickMoreAction", "onClickItemMoreAction"]);
const props = defineProps({
    data: {
        type: Object,
        default: {
            id: null,
            name: "",
            avatar: "",
            time: "",
            messages: "",
            action: null,
            online: false,
            visibleAction: false
        }
    },
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
        <el-badge :is-dot="data.online" class="dot-badge mr-4">
            <el-avatar
                :src="data.avatar"
                :size="45"
                class="border"
            />
        </el-badge>

        <div class="flex flex-col">
            <p class="name__item__list-massage font-medium text-ellipsis whitespace-nowrap overflow-hidden">
                {{ data.name }}
            </p>
            <div class="font-light text-sm text-gray-500 flex items-center"
                 :class="data?.action?.read ? 'font-semibold text-black' : ''">
                <span v-if="data.messages && data.messages.length > 0"
                      class="message__item__list-message text-ellipsis whitespace-nowrap overflow-hidden">
                    {{ data.messages[data.messages.length - 1].content }}
                </span>
                <span v-if="data.messages && data.messages.length > 0" class="mx-1"> • </span>
                <span>{{ data.time }}</span>
            </div>
        </div>

        <el-icon v-if="data.action.notification"
                 :size="22"
                 :color="'#808080'"
                 class="ml-4">
            <MuteNotification/>
        </el-icon>

        <el-popover
            ref="popoverRef"
            :visible="data.visibleAction"
            placement="bottom"
            :width="250">
            <more-action :action="data.action"
                         @on-click-item="(key) => handleClickItemMoreAction(key)"/>

            <template #reference>
                <el-button
                    class="more-action flex items-center justify-center"
                    :class="data.visibleAction ? 'active__more-action' : ''"
                    @click.stop="handleClickMoreAction">
                    <el-icon :size="14">
                        <MoreFilled/>
                    </el-icon>
                </el-button>
            </template>
        </el-popover>
    </div>
</template>