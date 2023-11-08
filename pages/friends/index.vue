<script setup lang="ts">

import Friends from "@/components/friends/friends.vue";
import {useLoading} from "@/composables/states";

const loading = useLoading();
loading.value = false;

</script>

<template>
    <friends />
</template>

<style scoped lang="scss">

</style>