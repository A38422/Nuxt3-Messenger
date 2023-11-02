<script setup lang="ts">
import {Bell, Search, User} from "@element-plus/icons-vue";

const data = ref({
    id: 0,
    name: "Ricky Smith",
    avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    message: "YOU: Okay, Let's get the...",
    time: "1 min ago",
    online: false,
    active: "Active 1h ago",
    visibleAction: false,
    action: {
        read: false,
        notification: true,
        block: true,
    }
});
</script>

<template>
    <!--  avt-->
    <div class="cursor-pointer flex flex-col justify-center items-center ">
        <div class="demo-type mt-20">
            <div>
                <el-avatar :size="110"
                           :src="data.avatar"
                />
            </div>
        </div>
        <div class="flex flex-col">
            <p class="name__item__list-massage font-medium text-ellipsis whitespace-nowrap overflow-hidden"
               style="margin-top: 20px">
                {{ data.name }}
            </p>
        </div>
        <div class="flex flex-col">
            <p class="name__item__list-massage font-normal text-ellipsis whitespace-nowrap overflow-hidden"
               style="margin-top: 5px">
                {{ data.active }}
            </p>
        </div>
    </div>
    <div class="flex flex-row justify-center items-center space-x-6 mt-2 mr-2 ">
        <div class="flex flex-col justify-center items-center text-center">
        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500" >
            <svg-icons name="icon-profile" size="20" color="#000000"/>
        </span>
            Thông tin <br>cá nhân
        </div>
        <div class="flex flex-col justify-center items-center text-center">
        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500" >
            <svg-icons name="icon-bell" size="20" color="#ffffff"/>
        </span>
            Tắt thông <br> báo
        </div>
        <div class="flex flex-col justify-center items-center mb-6">
        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500" >
            <svg-icons name="icon-search" size="20" color="#ffffff"/>
        </span>
            Tìm kiếm <br>
        </div>
    </div>

    <div class="demo-collapse ml-9 ">
        <el-collapse>
            <el-collapse-item title="Thông tin đoạn chat" name="1">
                <div class="flex flex-row items-center cursor-pointer">
                    <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center " >
                        <svg-icons name="icon-pin1" size="25" color="#000000"/>
                    </span>
                    <div class="mb-1 ml-2 ">
                    Xem tin nhắn đã ghim
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item title="Tuỳ chỉnh đoạn chat" name="2">
                <div class="flex flex-row items-center cursor-pointer mb-2">
                    <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center " style="margin-bottom: -1px" >
                        <svg-icons name="icon-ring" size="25" color="#000000"/>
                    </span>
                    <div class="mb-1 ml-2 flex-1">
                        Đổi chủ đề
                    </div>
                </div>
                <div class="flex flex-row items-center cursor-pointer mb-2">
                    <div class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center " >
                        <svg-icons name="icon-like2" size="20"/>
                    </div>
                    <div class="mb-1 ml-2 flex-1">
                        Thay đổi biểu tượng cảm xúc
                    </div>
                </div>
                <div class="flex flex-row items-center cursor-pointer mb-2">
                    <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center" style="margin-bottom: 0" >
                        <svg-icons name="icon-Aa" size="20" color="#000000"/>
                    </span>
                    <div class="mb-1 ml-2 flex-1">
                        Chỉnh sửa biêt danh
                    </div>
                </div>
                <div class="flex flex-row items-center cursor-pointer">
                    <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center"  style="margin-bottom: -2px" >
                        <svg-icons name="icon-search" size="20" color="#ffffff" />
                    </span>
                    <div class="mb-1 ml-2 flex-1">
                        Tìm kiếm trong cuộc trò chuyện
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item title="Efficiency" name="3">
                <div>
                    Simplify the process: keep operating process simple and intuitive;
                </div>
                <div>
                    Definite and clear: enunciate your intentions clearly so that the
                    users can quickly understand and make decisions;
                </div>
                <div>
                    Easy to identify: the interface should be straightforward, which helps
                    the users to identify and frees them from memorizing and recalling.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Controllability" name="4">
                <div>
                    Decision making: giving advices about operations is acceptable, but do
                    not make decisions for the users;
                </div>
                <div>
                    Controlled consequences: users should be granted the freedom to
                    operate, including canceling, aborting or terminating current
                    operation.
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>

</template>

<style lang="scss">
.demo-collapse {
    .el-collapse{
        border: none;

        .el-collapse-item__header {
            border: none;
        }
        .el-collapse-item__wrap{
            border: none;
        }
    }
}
</style>