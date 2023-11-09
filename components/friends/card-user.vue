<script setup lang="ts">

import {ChatDotRound} from "@element-plus/icons-vue";

const props = defineProps({
    user: {
        type: Object,
        default: {
            email: "",
            userID: "",
            userName: "",
            photoUrl: "",
            lastSeen: "",
            friendList: "",
            blockedUsers: "",
            notificationSettings: "",
        }
    }
});

const emits = defineEmits(["onClick", "onCreateChat"])

const bodyStyle = {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

const handleClick = () => {
    emits("onClick");
};

const handleCreateChat = (item: any) => {
    emits("onCreateChat", props.user);
};
</script>

<template>
    <el-card :body-style="bodyStyle" shadow="never">
        <el-avatar
            :src="user?.photoUrl"
            :size="120"
            class="border"
        />

        <div class="p-1 pt-3 flex flex-col justify-center">
            <p class="font-semibold text-center mb-3">{{user?.userName}}</p>
            <div class="flex justify-center">
                <slot/>
                <el-button @click="handleCreateChat">
                    Chat
                </el-button>
            </div>
        </div>
    </el-card>
</template>

<style scoped lang="scss">

</style>