<script setup lang="ts">

import {useChatStore} from "@/stores/chat";

const route = useRoute();
const chatStore = useChatStore();
const {getChatList} = useChat();

getChatList();

const chats = computed<any>(() => chatStore.chats);

const data = ref<any>(null);
const chatId = ref<any>(null);

watch(() => route.query.chatId,
    newId => {
        if (newId) {
            chatId.value = newId;
            if (chats.value.find((i: any) => i.id === newId)) {
                data.value = chats.value.find((i: any) => i.id === newId).participant
            }
        }
    }, {immediate: true}
);

watch(chats, async newChats => {
    if (newChats.find((i: any) => i.id === chatId.value)) {
        data.value = newChats.find((i: any) => i.id === chatId.value).participant
    }
}, {deep: true});

</script>

<template>
    <div v-if="data" class="h-full w-full flex flex-col">
        <div class="flex flex-col justify-center items-center ">
            <div class="mt-20">
                <el-avatar :size="110"
                           :src="data.photoUrl"
                />
            </div>

            <div class="flex flex-col">
                <p class="font-semibold text-ellipsis whitespace-nowrap overflow-hidden text-xl mt-3">
                    {{ data.userName }}
                </p>
            </div>

            <div class="flex flex-col">
                <p class="font-normal text-ellipsis whitespace-nowrap overflow-hidden mt-1">
                    {{ data.lastSeen }}
                </p>
            </div>
        </div>

        <div class="flex flex-row justify-center items-center space-x-6 mt-3 mr-2">
            <div class="flex flex-col justify-center items-center text-center">
                <span
                    class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500 transition">
                    <svg-icons name="icon-profile" size="20" color="#000000"/>
                </span>
                Thông tin <br>cá nhân
            </div>

            <div class="flex flex-col justify-center items-center text-center">
                <span
                    class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500 transition">
                    <svg-icons name="icon-bell" size="20" color="#ffffff"/>
                </span>
                Tắt thông <br> báo
            </div>

            <div class="flex flex-col justify-center items-center mb-6">
                <span
                    class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500 transition">
                    <svg-icons name="icon-search" size="20" color="#ffffff"/>
                </span>
                Tìm kiếm <br>
            </div>
        </div>

        <div class="demo-collapse px-8 overflow-auto flex-1 mt-3">
            <el-collapse>
                <el-collapse-item title="Thông tin đoạn chat" name="1">
                    <div class="flex flex-row items-center cursor-pointer">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center ">
                            <svg-icons name="icon-pin1" size="25" color="#000000"/>
                        </span>
                        <div class="mb-1 ml-2">
                            Xem tin nhắn đã ghim
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="Tuỳ chỉnh đoạn chat" name="2">
                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center "
                              style="margin-bottom: -1px">
                            <svg-icons name="icon-ring" size="25" color="#000000"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Đổi chủ đề
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <div class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center ">
                            <svg-icons name="icon-like2" size="20"/>
                        </div>
                        <div class="mb-1 ml-2 flex-1">
                            Thay đổi biểu tượng cảm xúc
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                              style="margin-bottom: 0">
                            <svg-icons name="icon-Aa" size="20" color="#000000"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Chỉnh sửa biêt danh
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                              style="margin-bottom: -2px">
                            <svg-icons name="icon-search" size="20" color="#ffffff"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Tìm kiếm trong cuộc trò chuyện
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="File phương tiện, file và liên kết" name="3">
                    <div class="flex flex-row items-center cursor-pointer mb-2">
                            <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center "
                                  style="margin-bottom: -1px">
                                <svg-icons name="icon-LPhoto" size="25" color="#000000"/>
                            </span>
                        <div class="mb-1 ml-2 flex-1">
                            File phương tiện
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <div class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center ">
                            <svg-icons name="icon-File1" size="20" color="#ffffff"/>
                        </div>
                        <div class="mb-1 ml-2 flex-1">
                            File
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                            <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                                  style="margin-bottom: 0">
                                <svg-icons name="icon-Link" size="20" color="#ffffff"/>
                            </span>
                        <div class="mb-1 ml-2 flex-1">
                            Liên kết
                        </div>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="Quyền riêng tư và hỗ trợ" name="4">
                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center "
                              style="margin-bottom: -1px">
                            <svg-icons name="icon-NonNofi" size="25" color="none"/>
                        </span>
                        <div class="mb-1 ml-2 flex-1">
                            Tắt thông báo
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                        <div class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center ">
                            <svg-icons name="icon-BlockChat" size="20"/>
                        </div>
                        <div class="mb-1 ml-2 flex-1">
                            Hạn chế
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer mb-2">
                            <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                                  style="margin-bottom: 0">
                                <svg-icons name="icon-userBlock" size="15" color="#000000"/>
                            </span>
                        <div class="mb-1 ml-2 flex-1">
                            Chặn
                        </div>
                    </div>

                    <div class="flex flex-row items-center cursor-pointer">
                            <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"
                                  style="margin-bottom: -2px">
                                <svg-icons name="icon-Report" size="20" color="#ffffff"/>
                            </span>
                        <div class="mb-1 ml-2 flex-1">
                            <div>
                                Báo cáo
                            </div>
                            <div style="font-size: 10px">
                                Đóng góp ý kiến và báo cáo cuộc trò chuyện
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