<script setup lang="ts">
const props = defineProps({
    avatar: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    active: {
        // type: String
        default: null
    }
});
</script>

<template>
    <div class="flex items-center">
        <div class="mr-3 flex flex-shrink-0">
            <el-avatar
                :src="avatar"
                :size="45"
                class="border"
            />
        </div>

        <div>
            <p class="text-sm font-semibold">{{ name }}</p>
<!--            <p class="text-xs">{{ active }}</p>-->
        </div>
    </div>

    <div class="flex gap-8">
        <svg-icons name="icon-phone" size="22" color="#2563eb" class="cursor-pointer"/>

        <svg-icons name="icon-camera" size="22" color="#2563eb" class="cursor-pointer"/>

        <svg-icons name="icon-info" size="22" color="#2563eb" class="cursor-pointer"/>
    </div>
</template>

<style scoped lang="scss">

</style>