<script setup lang="ts">

import {MoreFilled, MuteNotification} from "@element-plus/icons-vue";
import {ClickOutside as vClickOutside} from 'element-plus';
import MoreAction from "@/components/chat/list-message/more-action.vue";
import moment from "moment/moment";

const emits = defineEmits(["onClickOutside", "onClickMoreAction", "onClickItemMoreAction"]);
const props = defineProps({
    data: {
        type: Object,
        default: {
            id: null,
            name: "",
            avatar: "",
            time: null,
            Messages: [],
            online: null,
            action: null,
            visibleAction: false
        }
    },
});

const authStore = useAuthStore();
const route = useRoute();
const {updateChat} = useChat();
const {isDarkMode} = userDarkMode();

const user = computed(() => authStore.$state.user);
const className = computed(() => {
    if (props.data?.action.read) {
        if (user && user.value.userID === props.data.Messages[props.data.Messages.length - 1].senderID) {
            return "";
        }
        return 'font-semibold text-black';
    }
    return "";
});

watch(() => route.query.chatId,
    newId => {
        if (newId && props.data.id && user.value.userID !== props.data.id) {
            updateChat(newId, {
                read: false,
                notification: props.data.action.notification
            });
        }
    }, {immediate: true}
);

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

const convertTimestamp = (value: any) => {
    if (value) {
        return moment(+value.seconds * 1000).fromNow();
    }
    return "";
};

</script>

<template>
    <div class="item__list-message flex items-center"
         :class="isDarkMode ? 'dark dark__more-action' : ''"
         v-click-outside="onClickOutside">
        <el-badge :is-dot="data.online === 'online'" class="dot-badge mr-4">
            <el-avatar
                :src="data.avatar"
                :size="45"
            />
        </el-badge>

        <div class="flex flex-col">
            <p class="name__item__list-massage font-medium text-ellipsis whitespace-nowrap overflow-hidden">
                {{ data.name }}
            </p>
            <div v-if="data.Messages && data.Messages.length > 0"
                 class="font-light text-sm text-gray-500 flex items-center"
                 :class="className">
                <span v-if="data.Messages && data.Messages.length > 0"
                      class="message__item__list-message text-ellipsis whitespace-nowrap overflow-hidden">
                    {{ (user && user.userID === data.Messages[data.Messages.length - 1].senderID ? "You: " : "")
                        + data.Messages[data.Messages.length - 1].content }}
                </span>
                <span class="mx-1"> • </span>
                <span>{{ convertTimestamp(data.Messages[data.Messages.length - 1].timestamp) }}</span>
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
            :popper-class="isDarkMode ? 'dark__more-action' : ''"
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

<style lang="scss" >

.el-popover.el-popper.dark__more-action {
    background: #0f172a !important;
    color: #94a3b8 !important;
    border: 1px solid #2a3241;
}

</style>