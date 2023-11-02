<script setup lang="ts">
import {ChatDotRound, RemoveFilled, Setting, SwitchButton} from "@element-plus/icons-vue";

const route = useRoute();
const { user, signOut, signIn } = useAuth();

const active = computed<string>(() => route.path);

const sizeIcon = 25;
const noAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
</script>

<template>
    <!--    <el-container class="w-full h-screen bg-white dark:bg-black dark:text-white">-->
    <el-container class="common-layout h-screen w-full">
        <el-aside width="250px" class="flex flex-col h-full">
            <NuxtLink to="/" class="block m-4 image__lazy w-fit">
                <img src="@/assets/logo.svg" alt="" style="width: 40px; object-fit: cover"/>
            </NuxtLink>
            
            <el-menu
                class="el-menu-vertical flex-1 overflow-auto"
                :default-active="active"
            >
                <NuxtLink to="/">
                    <el-menu-item index="/">
                        <el-icon :size="sizeIcon">
                            <ChatDotRound/>
                        </el-icon>
                        <template #title>
                            <span class="ml-3 font-semibold text-lg">Chat</span>
                        </template>
                    </el-menu-item>
                </NuxtLink>
                
                <NuxtLink to="/friends">
                    <el-menu-item index="/friends">
                        <svg-icons name="icon-friends" :size="sizeIcon" class="mr-1"/>
                        <template #title>
                            <span class="ml-3 font-semibold text-lg">Friends</span>
                        </template>
                    </el-menu-item>
                </NuxtLink>
                
                <NuxtLink to="/blocks">
                    <el-menu-item index="/blocks">
                        <el-icon :size="sizeIcon">
                            <RemoveFilled/>
                        </el-icon>
                        <template #title>
                            <span class="ml-3 font-semibold text-lg">Blocks</span>
                        </template>
                    </el-menu-item>
                </NuxtLink>
                
                <NuxtLink to="/setting">
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
                <div v-if="user" class="flex items-center justify-between" @click="signOut">
                    <div class="flex items-center">
                        <el-avatar
                            :src="user.photoUrl"
                            :size="40"
                            class="border"
                            fit="cover"
                        />
                        <span class="ml-3 font-semibold text-lg">{{user.userName}}</span>
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
                            class="border"
                            fit="cover"
                        />
                        <span class="ml-3 font-semibold text-lg">Sign In</span>
                    </div>
                </div>
            </div>
        </el-aside>
        
        <el-divider direction="vertical"/>
        
        <el-main>
            <slot/>
        </el-main>
    </el-container>
</template>

<style lang="scss" scoped>
.common-layout {
    .el-main {
        padding: 0;
    }
}

.el-divider--vertical {
    height: 100%;
    margin: 0;
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
</style>