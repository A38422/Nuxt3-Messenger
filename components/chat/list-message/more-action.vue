<script setup lang="ts">
import {Bell, Check, Delete, MuteNotification, RemoveFilled} from "@element-plus/icons-vue";

const props = defineProps({
    action: {
        type: Object,
        required: true,
        default() {
            return {
                read: false,
                notification: false,
                block: false,
            }
        },
    }
});
const dialogVisible = ref(false)
const handleClickDelete = () => {
    dialogVisible.value = true
}
const outmodal = () => {
    delete();
    dialogVisible.value = false
    ElNotification({
        title: 'Notice',
        message: 'Delete Complete ',
        type: 'success',
        position: 'bottom-right',
    })
}

const emits = defineEmits(["onChangeRead", "onChangeNotification", "onChangeBlock", "onDelete", "onClickItem"])

const sizeIcon = 23;

const handleClick = (key : string) => {
    emits("onClickItem", key)
}
</script>

<template>
    <div class="h-full w-full flex flex-col justify-center">
        <div class="item__more-action flex items-center p-1"
             @click="handleClick('read')">
            <el-icon :size="sizeIcon" class="mr-2">
                <Check/>
            </el-icon>
            <span>{{ action?.read ? "Mark as unread" : "Mark as read" }}</span>
        </div>

        <div class="item__more-action flex items-center p-1"
             @click="handleClick('notification')">
            <el-icon :size="sizeIcon" class="mr-2">
                <Bell v-if="action?.notification"/>
                <MuteNotification v-else/>
            </el-icon>
            <span>{{ action?.notification ? "Mute notification" : "Unmute notification" }}</span>
        </div>

        <div class="item__more-action flex items-center p-1"
             @click="handleClick('block')">
            <el-icon :size="sizeIcon" class="mr-2">
                <RemoveFilled/>
            </el-icon>
            <span>{{ action?.block ? "Block" : "Unblock" }}</span>
        </div>

        <div class="item__more-action flex items-center p-1"
             @click="handleClick('delete')">
            <el-icon :size="sizeIcon" class="mr-2">
                <Delete/>
            </el-icon>
            <span> Delete chat </span>
        </div>
    </div>


    <el-dialog v-model="dialogVisible" title="Notice" width="30%" draggable>
        <span class="ml-12" style="font-size: 17px"> Do you wanna delete this chat ?</span>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="outmodal">
                      Confirm
                    </el-button>
                </span>
        </template>
    </el-dialog>
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