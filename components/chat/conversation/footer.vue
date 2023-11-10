<script setup lang="ts">
const emits = defineEmits(["onEnter", "value"]);

const message = ref("");

const send = () => {
    emits("onEnter", message.value);
    message.value = "";
}
</script>

<template>
    <div class="flex flex-row items-center justify-center p-4 gap-4">
        <svg-icons name="icon-plus-circle" color="#2563eb" size="24" class="cursor-pointer"/>

        <svg-icons name="icon-picture" color="#2563eb" size="24" class="cursor-pointer"/>

        <svg-icons name="icon-camera2" color="#2563eb" size="24" class="cursor-pointer"/>

        <svg-icons name="icon-voice" color="#2563eb" size="24" class="cursor-pointer"/>

        <div class="relative flex-grow">
            <input
                class="rounded-full py-2 pl-3 pr-10 w-full border border-gray-200 dark:border-slate-600 bg-gray-200 dark:bg-slate-900 focus:outline-none text-black dark:text-slate-400"
                type="text" placeholder="Aa"
                v-model="message"
                @keyup.enter="send"/>
            <span class="absolute top-0 bottom-0 flex items-center right-2.5">
                <svg-icons name="icon-emoji" color="#2563eb" size="24" class="cursor-pointer"/>
            </span>
        </div>

        <svg-icons name="icon-like" color="#2563eb" size="24" class="cursor-pointer"/>
    </div>
</template>

<style scoped lang="scss">

</style>