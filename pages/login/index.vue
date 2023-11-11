<script setup lang="ts">

definePageMeta({
    layout: 'custom'
});

const {signIn, signInWithEmail} = useAuth();

const formData = reactive({
    email: "",
    password: "",
});

const form = ref<any>("null");
const loading = ref<boolean>(false);

const rules = reactive({
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
    password: [{
        required: true,
        message: 'Please input email',
        trigger: 'blur',
    }],
});

const handleLogin = async () => {
    await form.value.validate(async (valid: any, fields: any) => {
        if (valid) {
            loading.value = true;
            const newUser = await signInWithEmail(formData);

            setTimeout(() => {
                loading.value = false;

                if (!newUser) {
                    ElMessage({
                        type: 'error',
                        message: 'Email or password is incorrect!',
                    });
                }
            }, 2500);
        }
    });
};

</script>

<template>
    <h2 class="text-center text-4xl font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold text-pink-500">Login</h2>

    <div class="mt-12">
        <el-form ref="form"
                 :model="formData"
                 :rules="rules">
            <el-form-item prop="email">
                <div class="text-sm font-semibold tracking-wide text-blue-500">Email</div>
                <el-input v-model="formData.email" placeholder="abc@gmail.com" autocomplete="off"/>
            </el-form-item>

            <el-form-item prop="password">
                <div class="flex justify-between items-center w-full">
                    <div class="text-sm font-semibold text-blue-500 tracking-wide">
                        Password
                    </div>
                    <div>
                        <span class="text-xs font-display font-semi-bold text-indigo-600 hover:text-pink-500
                                        cursor-pointer">
                            Forgot Password?
                        </span>
                    </div>
                </div>
                <el-input v-model="formData.password" type="password" placeholder="Enter your password" autocomplete="off"/>
            </el-form-item>

            <el-form-item class="mt-10">
                <button class="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-pink-500
                                shadow-lg text-base"
                        v-loading="loading"
                        @click.prevent="handleLogin">
                    Sign in
                </button>
            </el-form-item>
        </el-form>

        <div class="mt-6 font-display font-semibold text-gray-700 text-center text-sm">
            Don't have an account?
            <NuxtLink to="/signup" class="cursor-pointer text-indigo-600 hover:text-pink-500">
                Sign up
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