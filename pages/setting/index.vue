<script setup lang="ts">

import {useLoading} from "@/composables/states";
import Setting from "@/components/setting/setting.vue";

const authStore = useAuthStore();
const user = computed(() => authStore.$state.user);

const loading = useLoading();

loading.value = false;

</script>

<template>
    <div class="w-full h-full">
        <setting v-if="user"/>

        <NuxtLayout v-else name="error" class="w-full h-full flex flex-col items-center"/>
    </div>
</template>

<style scoped lang="scss">

</style>