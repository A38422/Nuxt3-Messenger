<script setup lang="ts">

import {useLoading} from "@/composables/states";

const loading = useLoading();

loading.value = false;

</script>

<template>
    <div class="w-full h-full">
        <NuxtLayout name="error" class="w-full h-full flex flex-col items-center"/>
    </div>
</template>

<style scoped lang="scss">

</style>