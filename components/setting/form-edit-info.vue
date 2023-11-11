<script setup lang="ts">

import type {FormRules} from "element-plus";

const {updateInfo} = useAuth();
const authStore = useAuthStore();

const user = computed(() => authStore.$state.user);
const dialogVisible = ref<boolean>(false);
const loading = ref<boolean>(false);
const form = ref<any>(null);

const formData = reactive<any>({
    userName: user.value.userName,
    email: user.value.email || '',
    phone: user.value.phone || '',
    address: user.value.address || '',
    company: user.value.company || '',
    education: user.value.education || '',
});

watch(user, () => {
    formData.userName = user.value.userName;
    formData.email = user.value.email;
    formData.phone = user.value.phone;
    formData.address = user.value.address;
    formData.company = user.value.company;
    formData.education = user.value.education;
}, {deep: true, immediate: true});

const validatePhone = (rule: any, value: any, callback: any) => {
    if (!value) callback();

    const checkPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value);
    if (!checkPhoneNumber) {
        callback(new Error('Please enter the correct phone number!'));
    }
    callback();
};

const rulesForm = reactive<FormRules<typeof formData>>({
    phone: [{ validator: validatePhone, trigger: 'blur' }],
});

const handleSave = async () => {
    if (!form.value) return;
    await form.value.validate(async (valid: any, fields: any) => {
        if (valid) {
            loading.value = true;
            await updateInfo(formData);
            loading.value = false;
            dialogVisible.value = false;
        }
    });
};

const resetForm = async () => {
    if (!form.value) return;
    await form.value.resetFields();
    formData.userName = user.value.userName;
    formData.email = user.value.email;
    formData.phone = user.value.phone;
    formData.address = user.value.address;
    formData.company = user.value.company;
    formData.education = user.value.education;
}

const open = async () => {
    await resetForm();
    dialogVisible.value = true;
};

defineExpose({
    open
});

</script>

<template>
    <el-dialog
        v-model="dialogVisible"
        title="Edit profile"
        width="25%"
    >
        <el-form
            ref="form"
            :model="formData"
            :rules="rulesForm"
            label-width="auto"
            label-position="left"
        >
            <el-form-item label="Username" prop="userName">
                <el-input v-model="formData.userName" disabled/>
            </el-form-item>

            <el-form-item label="Email" prop="email">
                <el-input v-model="formData.email" disabled/>
            </el-form-item>

            <el-form-item label="Phone" prop="phone">
                <el-input v-model="formData.phone" />
            </el-form-item>

            <el-form-item label="Address" prop="address">
                <el-input v-model="formData.address" />
            </el-form-item>

            <el-form-item label="Company" prop="company">
                <el-input v-model="formData.company" />
            </el-form-item>

            <el-form-item label="Education" prop="education">
                <el-input v-model="formData.education" />
            </el-form-item>
        </el-form>

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
    .el-form-item__label {
        color: #94a3b8;
    }

    .el-input {
        --el-input-text-color: #94a3b8;
        --el-input-bg-color: #1e293b;

        .el-input__wrapper {
            box-shadow: 0 0 0 1px #414243 inset;
            -webkit-transition: background-color var(--el-transition-duration);

            &:hover {
                --el-input-bg-color: #334155;
            }
        }
    }

    .el-input.is-disabled .el-input__wrapper {
        --el-input-text-color: #94a3b8;
        background-color: #374343;
        box-shadow: 0 0 0 1px #414243 inset;
    }

    .el-loading-mask {
        background-color: rgba(14, 14, 14, 0.7);
    }
}
</style>