<script setup lang="ts">
import {Bell, Check, Delete, MuteNotification, RemoveFilled} from "@element-plus/icons-vue";

const props = defineProps({
    action: {
        type: Object,
        default: {
            read: false,
            notification: false,
            block: false,
        },
        required: true
    }
});

const {action} = props;

const sizeIcon = 25;
</script>

<template>
    <div class="h-full w-full flex flex-col justify-center">
        <div class="item__more-action flex items-center p-1">
            <el-icon :size="sizeIcon" class="mr-2">
                <Check/>
            </el-icon>
            <span v-if="action.read">Mark as unread</span>
            <span>Mark as read</span>
        </div>
        
        <div class="item__more-action flex items-center p-1">
            <el-icon :size="sizeIcon" class="mr-2">
                <!--                <Bell />-->
                <MuteNotification/>
            </el-icon>
            <span>Mute notification</span>
            <!--            <span>Unmute notification</span>-->
        </div>
        
        <div class="item__more-action flex items-center p-1">
            <el-icon :size="sizeIcon" class="mr-2">
                <RemoveFilled/>
            </el-icon>
            <span>Block</span>
            <!--            <span>Unblock</span>-->
        </div>
        
        <div class="item__more-action flex items-center p-1">
            <el-icon :size="sizeIcon" class="mr-2">
                <Delete/>
            </el-icon>
            <span>Delete chat</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.item__more-action {
    cursor: pointer;
    -webkit-transition: background-color var(--el-transition-duration);
    
    &:hover {
        background-color: #f7f8f8;
    }
}
</style>