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
    <div class="flex flex-row justify-center items-center space-x-8 mt-2 ">
        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500" >
            <svg-icons name="icon-profile" size="20" color="#000000"/>
        </span>
        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500" >
            <svg-icons name="icon-bell" size="20" color="#ffffff"/>
        </span>
        <span class="bg-gray-200 p-1 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-gray-500" >
            <svg-icons name="icon-search" size="20" color="#ffffff"/>
        </span>
    </div>

    <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="Thông tin đoạn chat" name="1">
                <div>

                </div>
            </el-collapse-item>
            <el-collapse-item title="Feedback" name="2">
                <div>
                    Operation feedback: enable the users to clearly perceive their
                    operations by style updates and interactive effects;
                </div>
                <div>
                    Visual feedback: reflect current state by updating or rearranging
                    elements of the page.
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

<style scoped lang="scss">

</style>