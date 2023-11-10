<script setup lang="ts">
import {ChatDotRound, RemoveFilled, Setting, SwitchButton} from "@element-plus/icons-vue";
import {useLoading} from "@/composables/states";

const route = useRoute();
const {user, signOut, signIn, getUserList, getFriendList, getFriendRequest, updateLastSeenTime} = useAuth();
const {getChatList} = useChat();
const {isDarkMode} = userDarkMode();

const sizeIcon = 25;
const noAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const active = computed<string>(() => route.path);

const loading = useLoading();

const handleClickSignOut = () => {
    ElMessageBox.confirm(
        'Messenger will be sign out your account. Continue?',
        'Confirm',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }
    ).then(() => {
        signOut();

        ElMessage({
            type: 'success',
            message: 'Sign out completed',
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: 'Sign out canceled',
        })
    })
};

const handleLoading = (path: any) => {
    if (active.value !== path) loading.value = true;
};

getUserList();
getChatList();
getFriendList();
getFriendRequest();

onBeforeUnmount(() => {
    updateLastSeenTime();
});

</script>

<template>
        <el-container class="antialiased common-layout w-full h-screen text-black dark:text-slate-400 bg-white dark:bg-slate-900">
<!--    <el-container class="common-layout h-screen w-full">-->
        <el-aside width="250px" class="aside-menu flex flex-col h-full"
                  :class="isDarkMode ? 'dark-menu' : ''">
            <NuxtLink to="/" class="block m-4 image__lazy w-fit" @click="handleLoading('/')">
                <img src="@/assets/logo.svg" alt="" style="width: 40px; object-fit: cover"/>
            </NuxtLink>

            <el-menu
                class="el-menu-vertical flex-1 overflow-auto"
                :default-active="active"
            >
                <NuxtLink to="/" @click="handleLoading('/')">
                    <el-menu-item index="/">
                        <el-icon :size="sizeIcon">
                            <ChatDotRound/>
                        </el-icon>
                        <template #title>
                            <span class="ml-3 font-semibold text-lg">Chat</span>
                        </template>
                    </el-menu-item>
                </NuxtLink>

                <NuxtLink to="/friends" @click="handleLoading('/friends')">
                    <el-menu-item index="/friends">
                        <svg-icons v-if="active === '/friends'" name="icon-friends"
                                   color="#409eff"
                                   :size="sizeIcon"
                                   class="mr-1"/>
                        <svg-icons v-else-if="isDarkMode" name="icon-friends"
                                   color="#94a3b8"
                                   :size="sizeIcon"
                                   class="mr-1"/>
                        <svg-icons v-else name="icon-friends"
                                   :size="sizeIcon"
                                   class="mr-1"/>
                        <template #title>
                            <span class="ml-3 font-semibold text-lg">Friends</span>
                        </template>
                    </el-menu-item>
                </NuxtLink>

                <NuxtLink to="/blocks" @click="handleLoading('/blocks')">
                    <el-menu-item index="/blocks">
                        <el-icon :size="sizeIcon">
                            <RemoveFilled/>
                        </el-icon>
                        <template #title>
                            <span class="ml-3 font-semibold text-lg">Blocks</span>
                        </template>
                    </el-menu-item>
                </NuxtLink>

                <NuxtLink to="/setting" @click="handleLoading('/setting')">
                    <el-menu-item index="/setting">
                        <el-icon :size="sizeIcon">
                            <Setting/>
                        </el-icon>
                        <template #title>
                            <span class="ml-3 font-semibold text-lg">Setting</span>
                        </template>
                    </el-menu-item>
                </NuxtLink>
            </el-menu>

            <div class="item-menu__logout">
                <div v-if="user" class="flex items-center justify-between" @click="handleClickSignOut">
                    <div class="flex items-center">
                        <el-avatar
                            :src="user.photoUrl"
                            :size="40"
                            fit="cover"
                        />
                        <span class="ml-3 font-semibold text-lg">{{ user.userName }}</span>
                    </div>
                    <el-icon :size="sizeIcon">
                        <SwitchButton/>
                    </el-icon>

                </div>
                <div v-else class="flex items-center justify-between" @click="signIn">
                    <div class="flex items-center">
                        <el-avatar
                            :src="noAvatar"
                            :size="40"
                            fit="cover"
                        />
                        <span class="ml-3 font-semibold text-lg">Sign In</span>
                    </div>
                </div>
            </div>
        </el-aside>

        <div :class="isDarkMode ? 'dark-divider' : ''">
            <el-divider direction="vertical" />
        </div>

        <el-main v-loading="loading">
            <slot/>
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>

.antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.common-layout {
    .el-main {
        padding: 0;
    }

    .el-menu-vertical {
        border-right: none;
    }

    .image__lazy {
        height: 40px;
    }

    .item-menu__logout {
        width: 100%;
        padding: 10px 20px;
        cursor: pointer;

        &:hover {
            background: var(--el-menu-hover-bg-color);
            transition: border-color var(--el-transition-duration),
            background-color var(--el-transition-duration),
            color var(--el-transition-duration);
        }
    }

    .el-divider--vertical {
        height: 100%;
        margin: 0;
    }

    .dark-menu {
        .el-menu {
            background-color: #0f172a;

            .el-menu-item {
                color: #94a3b8;
            }

            .el-menu-item.is-active {
                color: var(--el-menu-active-color);
            }
        }
    }

    .dark-divider {
        .el-divider--vertical {
            --tw-divide-opacity: 1;
            border-left: 1px solid #4c4d4f;
        }
    }
}

html.dark {
    .el-menu-item:hover {
        background-color: #334155;
    }
}
</style>