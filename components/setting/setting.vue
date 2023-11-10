<script setup lang="ts">

import PersonalInformation from "@/components/setting/personal-information.vue";
import {Edit} from "@element-plus/icons-vue";

const authStore = useAuthStore();

const user = computed(() => authStore.$state.user);

</script>

<template>
    <div class="h-full w-full flex flex-col items-center">
        <div class="mt-20">
            <el-avatar :size="150"
                       :src="user.photoUrl"
            />
            <p class="font-semibold text-3xl mt-2">{{ user.userName }}</p>
        </div>

        <div class="my-6">
            <el-button>
                <el-icon class="mr-1">
                    <Edit />
                </el-icon>
                Edit profile
            </el-button>
        </div>

        <div>
            <personal-information/>
        </div>
    </div>
</template>

<style lang="scss">

</style>