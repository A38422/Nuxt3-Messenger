<script setup lang="ts">

import moment from "moment"

const route = useRoute();
const authStore = useAuthStore();
const chatStore = useChatStore();

const user = computed<any>(() => authStore.$state.user);
const users = computed<any>(() => authStore.$state.userList);
const chats = computed<any>(() => chatStore.$state.chats);

const data = ref<any>(null);
const chatId = ref<any>(null);

watch(() => route.query.chatId,
    newId => {
        chatId.value = newId;
        if (chatId.value && chats.value.find((i: any) => i.id === newId)) {
            const friend = chats.value.find((i: any) => i.id === newId).participants
                .find((x: any) => x.userID !== user.value.userID);
            data.value = users.value.find((i: any) => i.userID === friend.userID);
        } else {
            data.value = null;
        }
    }, {immediate: true}
);

watch(chats, async newChats => {
    if (chatId.value && newChats.find((i: any) => i.id === chatId.value)) {
        const friend = newChats.find((i: any) => i.id === chatId.value).participants
            .find((x: any) => x.userID !== user.value.userID);
        data.value = users.value.find((i: any) => i.userID === friend.userID);
    } else {
        data.value = null;
    }
}, {deep: true, immediate: true});

watch(users, async newUsers => {
    if (newUsers && newUsers.length > 0 && chatId.value && chats.value.find((i: any) => i.id === chatId.value)) {
        const friend = chats.value.find((i: any) => i.id === chatId.value).participants
            .find((x: any) => x.userID !== user.value.userID);
        data.value = newUsers.find((i: any) => i.userID === friend.userID);
    } else {
        data.value = null;
    }
}, {deep: true});

const convertTimestamp = () => {
    if (data.value) {
        if (data.value.lastSeen === "online") return "Active now";
        else if (data.value.lastSeen)
            return "Active " + moment(+data.value.lastSeen.seconds * 1000).fromNow();
        else return "";
    }
    return "";
};

</script>

<template>
    <div v-if="user && data" class="h-full flex flex-col">
        <div class="flex flex-col justify-center items-center ">
            <div class="mt-20">
                <el-avatar :size="110"
                           :src="data.photoUrl"
                />
            </div>

            <div class="flex flex-col">
                <p class="font-semibold text-ellipsis whitespace-nowrap overflow-hidden text-xl mt-3">
                    {{ data?.userName }}
                </p>
            </div>

            <div class="flex flex-col">
                <p class="font-normal text-ellipsis whitespace-nowrap overflow-hidden mt-1">
                    {{ convertTimestamp() }}
                </p>
            </div>
        </div>

        <div class="columns-3 px-8 mt-3">
            <div class="flex flex-col justify-center items-center text-center">
                <span
                    class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500 transition">
                    <svg-icons name="icon-profile" size="20" color="#000000"/>
                </span>
                Personal <br> information
            </div>

            <div class="flex flex-col justify-center items-center text-center">
                <span
                    class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500 transition">
                    <svg-icons name="icon-bell" size="20" color="#ffffff"/>
                </span>
                Turn off <br> notifications
            </div>

            <div class="flex flex-col justify-center items-center text-center">
                <span
                    class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500 transition">
                    <svg-icons name="icon-search" size="20" color="#ffffff"/>
                </span>
                Search
            </div>
        </div>

        <div class="demo-collapse px-8 overflow-auto flex-1 mt-3">
            <el-collapse>
                <el-collapse-item title="Chat details" name="1">
                    <div class="flex flex-row items-center cursor-pointer">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center ">
                            <svg-icons name="icon-pin1" size="25" color="#000000"/>
                        </span>
                        <div class="mb-1 ml-2">
                            View pinned messages
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="Chat customization" name="2">
                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center "
                              style="margin-bottom: -1px">
                            <svg-icons name="icon-ring" size="25" color="#000000"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Change topic
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <div class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center ">
                            <svg-icons name="icon-like2" size="20"/>
                        </div>
                        <div class="mb-1 ml-2 flex-1">
                            Change emoji
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                              style="margin-bottom: 0">
                            <svg-icons name="icon-Aa" size="20" color="#000000"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Edit nickname
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                              style="margin-bottom: -2px">
                            <svg-icons name="icon-search" size="20" color="#ffffff"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Search in chat
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="Media files, files and links" name="3">
                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center "
                              style="margin-bottom: -1px">
                            <svg-icons name="icon-LPhoto" size="25" color="#000000"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Media files
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <div class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center ">
                            <svg-icons name="icon-File1" size="20" color="#ffffff"/>
                        </div>
                        <div class="mb-1 ml-2 flex-1">
                            Files
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                              style="margin-bottom: 0">
                            <svg-icons name="icon-Link" size="20" color="#ffffff"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Links
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="Privacy and support" name="4">
                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center "
                              style="margin-bottom: -1px">
                            <svg-icons name="icon-NonNofi" size="25" color="none"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Turn off notifications
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <div class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center ">
                            <svg-icons name="icon-BlockChat" size="20"/>
                        </div>
                        <div class="mb-1 ml-2 flex-1">
                            Restrict
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                              style="margin-bottom: 0">
                            <svg-icons name="icon-userBlock" size="15" color="#000000"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Block
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                              style="margin-bottom: -2px">
                            <svg-icons name="icon-Report" size="20" color="#ffffff"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            <div>
                                Reports
                            </div>
                            <div style="font-size: 10px">
                                Provide feedback and report conversation
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>

    <NuxtLayout v-else name="error" class="h-full w-full flex flex-col"/>
</template>

<style lang="scss">

.demo-collapse {
    .el-collapse {
        border: none;

        .el-collapse-item__header {
            border: none;
            font-size: 16px;
            font-weight: 500;
        }

        .el-collapse-item__wrap {
            border: none;
        }

        .el-collapse-item__content {
            padding-bottom: 0;
            font-size: 16px;
        }
    }
}

</style>