<script setup lang="ts">

import type {FormRules} from "element-plus";

definePageMeta({
    layout: 'custom'
});

const {signUp, signIn} = useAuth();

const form = ref<any>("null");
const loading = ref<boolean>(false);

const formData = reactive({
    email: "",
    password: "",
    rePassword: "",
    firstName: "",
    lastName: "",
});

const validatePass = (rule: any, value: any, callback: any) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (value === '') {
        callback(new Error('Please input the password'))
    } else if (!passwordRegex.test(value)) {
        return callback(new Error(
            'Password must be 8 characters including uppercase letters, lowercase letters, numbers and special characters'
        ));
    } else {
        if (formData.password !== '') {
            if (!form.value) return;
            form.value.validateField('rePassword', () => null);
        }
        callback()
    }
};

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== formData.password) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
};

const rules = reactive<FormRules<typeof formData>>({
    email: [
        {
            required: true,
            message: 'Please input email',
            trigger: 'blur',
        },
        {
            type: 'email',
            message: 'Please input correct email',
            trigger: ['blur'],
        },
    ],
    password: [{validator: validatePass, trigger: 'blur'}],
    rePassword: [{validator: validatePass2, trigger: 'blur'}],
    firstName: [
        {
            required: true,
            message: 'Please input first name',
            trigger: 'blur',
        },
    ],
    lastName: [
        {
            required: true,
            message: 'Please input last name',
            trigger: 'blur',
        },
    ],
});

const handleSignUp = async () => {
    await form.value.validate(async (valid: any, fields: any) => {
        if (valid) {
            loading.value = true;
            const newUser = await signUp(formData);

            setTimeout(() => {
                if (!newUser) {
                    ElMessage({
                        type: 'error',
                        message: 'Email exists!',
                    });
                }
            }, 2500);
        }
    });
};

</script>

<template>
    <h2 class="text-center text-4xl font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold text-pink-500">Sign up</h2>

    <div class="mt-12">
        <el-form ref="form"
                 :model="formData"
                 :rules="rules">
            <div class="w-full">
                <div class="text-sm font-semibold tracking-wide text-blue-500">Your name</div>

                <div class="w-full flex gap-2">
                    <el-form-item class="w-1/2" prop="firstName">
                        <el-input
                            v-model="formData.firstName"
                            label="First Name"
                            placeholder="First name"
                        />
                    </el-form-item>

                    <el-form-item class="w-1/2" prop="lastName">
                        <el-input
                            v-model="formData.lastName"
                            label="Last Name"
                            placeholder="Last name"
                        />
                    </el-form-item>
                </div>
            </div>

            <el-form-item prop="email">
                <div class="text-sm font-semibold tracking-wide text-blue-500">Email</div>
                <el-input v-model="formData.email" placeholder="abc@gmail.com"/>
            </el-form-item>

            <el-form-item prop="password">
                <div class="text-sm font-semibold text-blue-500 tracking-wide">
                    Password
                </div>
                <el-input v-model="formData.password" type="password" placeholder="Enter your password"/>
            </el-form-item>

            <el-form-item prop="rePassword">
                <div class="text-sm font-semibold text-blue-500 tracking-wide">
                    Re-password
                </div>
                <el-input v-model="formData.rePassword" type="password" placeholder="Enter your re-password"/>
            </el-form-item>

            <el-form-item class="mt-10">
                <button class="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-pink-500
                                shadow-lg text-base"
                        v-loading="loading"
                        @click.prevent="handleSignUp">
                    Sign up
                </button>
            </el-form-item>
        </el-form>

        <div class="mt-6 font-display font-semibold text-gray-700 text-center text-sm">
            You're have an account?
            <NuxtLink to="/login" class="cursor-pointer text-indigo-600 hover:text-pink-500">
                Sign in
            </NuxtLink>
        </div>

        <div class="flex justify-center">
            <button class="mt-3 flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md
                    px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    @click.prevent="signIn">
                <img src="@/assets/logo-google.svg" class="h-6 w-6 mr-2"  alt="">
                <span>Sign in with Google</span>
            </button>
        </div>
    </div>
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