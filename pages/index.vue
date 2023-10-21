<script setup lang="ts">
// const runtimeConfig = useRuntimeConfig()
// const appConfig = useAppConfig()
// const { sayHello } = useUtils();
// sayHello()
// const { $sayHello } = useNuxtApp()
// $sayHello("Minh")

</script>

<template>
    <el-row class="w-full h-full">
        <el-col :span="6" class="border-r-2 border-r-gray-100 h-full w-full">
            <ChatListMessage/>
        </el-col>
        
        <el-col :span="12" class="border-r-2 border-r-gray-100 h-full w-full">
            <ChatConversation/>
        </el-col>
        
        <el-col :span="6">
            <ChatOtherAction/>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>

</style>