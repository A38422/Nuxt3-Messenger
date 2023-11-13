<script setup lang="ts">

import {Moon, Sunny} from "@element-plus/icons-vue";

const {isDarkMode, toggleDarkMode} = userDarkMode();

const valueSwitch = ref<boolean>(isDarkMode.value);

watch(isDarkMode, () => {
    valueSwitch.value = isDarkMode.value;
});

const handleChange = (value: boolean) => {
    toggleDarkMode(value);
};


</script>

<template>
    <div class="lg:flex h-screen text-black dark:text-slate-400 bg-white dark:bg-slate-900">
        <div class="lg:w-1/2 xl:max-w-screen-sm h-full relative">
            <div class="absolute right-5 top-5">
                <el-switch v-model="valueSwitch"
                           inline-prompt
                           :active-icon="Moon"
                           :inactive-icon="Sunny"
                           @change="handleChange"/>
            </div>

            <div class="py-12 bg-indigo-100 lg:bg-white dark:lg:bg-slate-900 dark:bg-indigo-300 flex justify-center lg:justify-start lg:pl-5">
                <div class="flex items-center">
                    <div class="m-4 image__lazy w-fit">
                        <img src="@/assets/logo.svg" alt="" class="w-[80px]">
                    </div>
                    <div class="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">Infinity</div>
                </div>
            </div>

            <div class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <slot/>
            </div>
        </div>

        <div class="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
            <div class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
                <img src="@/assets/login.svg" alt="" class="w-5/6 mx-auto" >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>