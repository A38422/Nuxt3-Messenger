<script setup lang="ts">

import type {UploadProps} from "element-plus";
import {Plus} from "@element-plus/icons-vue";

const {updateAvatar} = useAuth();

const dialogVisible = ref<boolean>(false);
const loading = ref<boolean>(false);
const imageUrl = ref('');
const urlUpload = ref('');
const fileName = ref('');

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!);
    imageUrl.value = `https://firebasestorage.googleapis.com/v0/b/nuxt3-messenger.appspot.com/o/${fileName.value}?alt=media&token=${response.downloadTokens}`;
};

const handleAvatarError = () => {
    ElMessage.error('Upload failed!');
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/jpg' || rawFile.type === 'image/png') {
        urlUpload.value = `https://firebasestorage.clients6.google.com/v0/b/nuxt3-messenger.appspot.com/o?name=${rawFile.name}`
        fileName.value = rawFile.name;
        return true;
    } else if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('Avatar picture size can not exceed 5MB!');
        return false;
    }
    ElMessage.error('Avatar picture must be JPG, JPEG, PNG format!');
    return false;
};

const open = () => {
    dialogVisible.value = true;
};

const handleSave = async () => {
    if (!imageUrl.value) return;

    loading.value = true;
    await updateAvatar(imageUrl.value);
    loading.value = false;
    dialogVisible.value = false;
};

defineExpose({
    open
});

</script>

<template>
    <el-dialog
        v-model="dialogVisible"
        title="Choose picture"
        width="25%"
    >
        <div class="upload-avatar flex justify-center">
            <el-upload
                class="avatar-uploader"
                :action="urlUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-error="handleAvatarError"
                :before-upload="beforeAvatarUpload"
                :auto-upload="true"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt=""/>
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </div>

        <template #footer>
             <span class="dialog-footer">
                 <el-button class="dark" @click="dialogVisible = false">
                     Cancel
                 </el-button>
                 <el-button type="primary" @click="handleSave" :loading="loading">
                     Save
                 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss">

html.dark {
    .el-dialog {
        --el-dialog-bg-color: #0f172a;
    }

    .el-dialog__title {
        color: #94a3b8;
    }

    .el-button.dark {
        --el-button-bg-color: #0f172a;
        color: #94a3b8;
        border: 1px solid #2a3241;

        &:hover {
            color: #409eff;
            border-color: #213d5b;
            background-color: #18222c;
            outline: none;
        }
    }

    .el-message-box {
        --el-messagebox-title-color: #94a3b8;
        --el-messagebox-content-color: #94a3b8;
        background-color: #0f172a;
        border: 1px solid #2a3241;
    }
}

.upload-avatar {
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
}

</style>