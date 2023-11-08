<script setup lang="ts">

import {useLoading} from "@/composables/states";

const {$bus} = useNuxtApp();
const loading = useLoading();

loading.value = false;

const visible = ref(true);

$bus.on("onClickMoreInfo", () => {
    visible.value = !visible.value;
});

onUnmounted(() => {
    $bus.off("onClickMoreInfo");
});

</script>

<template>
    <div class="w-full h-full flex">
        <div class="border-r-2 border-r-gray-100 h-full">
            <ChatListMessage/>
        </div>

        <div class="border-r-2 border-r-gray-100 h-full flex-1">
            <ChatConversation/>
        </div>

        <div v-if="visible" class="h-full w-96 2xl:block sm:hidden">
            <ChatOtherAction/>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>