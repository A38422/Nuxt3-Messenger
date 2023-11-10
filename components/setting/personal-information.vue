<script setup lang="ts">

import {
    BellFilled,
    EditPen,
    Iphone,
    LocationFilled,
    Message,
    Moon,
    OfficeBuilding,
    User
} from "@element-plus/icons-vue";

const authStore = useAuthStore();
const {isDarkMode, toggleDarkMode} = userDarkMode();

const user = computed(() => authStore.$state.user);

const valueSwitch = ref<boolean>(user.value.notification);
const darkMode = ref<boolean>(isDarkMode.value);

watch(isDarkMode, () => {
    darkMode.value = isDarkMode.value
});

const handleChange = (value: boolean) => {
    toggleDarkMode(value);
};

</script>

<template>
    <el-descriptions
        title=""
        :column="1"
        size="large"
        class="w-[600px]"
        border
    >
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <User/>
                    </el-icon>
                    Username
                </div>
            </template>
            {{ user.userName }}
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <Message/>
                    </el-icon>
                    Email
                </div>
            </template>
            {{ user.email }}
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <iphone/>
                    </el-icon>
                    Telephone
                </div>
            </template>
            {{ user.phone ? user.phone : '-' }}
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <LocationFilled/>
                    </el-icon>
                    Address
                </div>
            </template>
            {{ user.address ? user.address : '-' }}
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <office-building/>
                    </el-icon>
                    Company
                </div>
            </template>
            {{ user.address ? user.address : '-' }}
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    Education
                </div>
            </template>
            {{ user.address ? user.address : '-' }}
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <BellFilled/>
                    </el-icon>
                    Notification
                </div>
            </template>
            <el-switch v-model="valueSwitch"/>
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <Moon/>
                    </el-icon>
                    Dark mode
                </div>
            </template>
            <el-switch v-model="darkMode"
                       @change="handleChange"/>
        </el-descriptions-item>
    </el-descriptions>
</template>

<style lang="scss">

html.dark {
    .el-descriptions {
        --el-descriptions-table-border: 1px solid #363637;
        --el-descriptions-item-bordered-label-background: #00325d;
    }

    .el-descriptions__body {
        background-color: #0f172a;
    }

    .el-descriptions__label.el-descriptions__cell.is-bordered-label {
        color: #94a3b8 ;
    }

    .el-descriptions__content.el-descriptions__cell.is-bordered-content {
        color: #94a3b8;

    }
}

</style>