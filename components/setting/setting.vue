<script setup lang="ts">

import PersonalInformation from "@/components/setting/personal-information.vue";
import {Camera, Edit} from "@element-plus/icons-vue";
import UploadImageModal from "@/components/setting/upload-image-modal.vue";
import FormEditInfo from "~/components/setting/form-edit-info.vue";

const authStore = useAuthStore();

const user = computed(() => authStore.$state.user);

const uploadModal = ref<any>(null);
const formEdit = ref<any>(null);

const openModalUpload = () => {
    uploadModal.value.open();
};

const handleOpenFormEdit = () => {
    formEdit.value.open();
};

</script>

<template>
    <div class="h-full w-full flex flex-col items-center">
        <div class="mt-20">
            <div class="relative">
                <el-avatar :size="150"
                           :src="user.photoUrl"
                />
                <div class="h-10 w-10 rounded-full dark:bg-white dark:hover:bg-gray-200 flex flex-col items-center
                            justify-center absolute bottom-3 right-2 cursor-pointer
                            bg-gray-200 hover:bg-gray-400 transition"
                     @click="openModalUpload">
                    <el-icon :size="20">
                        <Camera/>
                    </el-icon>
                </div>
            </div>
            <p class="font-semibold text-3xl mt-2">{{ user.userName }}</p>
        </div>

        <div class="my-6">
            <el-button class="dark"
                       @click="handleOpenFormEdit">
                <el-icon class="mr-1" :size="20">
                    <Edit/>
                </el-icon>
                Edit profile
            </el-button>
        </div>

        <div>
            <personal-information/>
        </div>

        <upload-image-modal ref="uploadModal"/>
        <form-edit-info ref="formEdit"/>
    </div>
</template>

<style lang="scss">

</style>

<!--https://lh3.googleusercontent.com/a/ACg8ocKo3TMZHfmKUqZ_SknpM0yi-IgqdyErHgo9DWlim_Bg=s96-c-->