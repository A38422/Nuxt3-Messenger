<script setup lang="ts">

const props = defineProps({
    user: {
        type: Object,
        default: {
            email: "",
            userID: "",
            userName: "",
            photoUrl: "",
            lastSeen: "",
            friendList: [],
            blockedUsers: [],
            notificationSettings: "",
        }
    }
});

const emits = defineEmits(["onClick", "onCreateChat"])

const bodyStyle = {
    maxWidth: "230px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "20px 10px"
};

const handleClick = () => {
    emits("onClick");
};

const handleCreateChat = (item: any) => {
    emits("onCreateChat", props.user);
};
</script>

<template>
    <el-card :body-style="bodyStyle" shadow="never" class="card-user">
        <el-avatar
            :src="user?.photoUrl"
            :size="120"
            class="border"
        />

        <div class="p-1 pt-3 flex flex-col justify-center">
            <p class="font-semibold text-center mb-3">{{user?.userName}}</p>
            <div class="flex justify-center flex-wrap items-center gap-1">
                <slot/>
                <el-button @click="handleCreateChat">
                    Chat
                </el-button>
            </div>
        </div>
    </el-card>
</template>

<style lang="scss">
.card-user {
    .el-button {
        margin: 0;
    }
}
</style>