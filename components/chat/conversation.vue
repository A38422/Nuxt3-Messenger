<script setup lang="ts">

onMounted(() => {
    const elChatBody = document.querySelector(".chat-body");
    elChatBody?.scroll(0, elChatBody.scrollHeight)
})

const data = ref({
    id: 0,
    name: "Ricky Smith",
    avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    message: "YOU: Okay, Let's get the...",
    time: "1 min ago",
    online: false,
    active: "Active 1h ago",
    visibleAction: false,
    action: {
        read: false,
        notification: true,
        block: true,
    }
});

</script>

<template>
    <section class="chat-container overflow-hidden h-full w-full flex flex-col ">
        <div
            class="chat-header px-6 py-4 flex flex-row justify-between items-center border-b-2 border-b-gray-100">
            <div class="flex items-center">
                <div class="mr-3 flex flex-shrink-0">
                    <el-avatar
                        :src="data.avatar"
                        :size="45"
                        class="border"
                    />
                </div>

                <div>
                    <p class="text-sm font-bold">{{ data.name }}</p>
                    <p class="text-xs">{{ data.active }}</p>
                </div>
            </div>

            <div class="flex gap-8">
                <svg-icons name="icon-phone" size="22" color="#2563eb" class="cursor-pointer"/>

                <svg-icons name="icon-camera" size="22" color="#2563eb" class="cursor-pointer"/>

                <svg-icons name="icon-info" size="22" color="#2563eb" class="cursor-pointer"/>
            </div>
        </div>

        <div class="chat-body p-4 flex-1 overflow-auto h-full">
            <div class="flex flex-row justify-start">
                <el-avatar
                    :src="data.avatar"
                    :size="35"
                    class="border mr-4"
                />

                <div class="messages text-sm text-gray-700 grid grid-flow-row gap-0.5">
                    <div class="flex items-center group">
                        <p class="px-6 py-3 rounded-t-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Hey! How
                            are
                            you?</p>
                    </div>
                    <div class="flex items-center group">
                        <p class="px-6 py-3 rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Shall we go for Hiking
                            this
                            weekend?</p>
                    </div>
                    <div class="flex items-center group">
                        <p class="px-6 py-3 rounded-b-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Lorem
                            ipsum
                            dolor sit
                            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.</p>
                    </div>
                </div>
            </div>

            <p class="p-4 text-center text-sm text-gray-500">FRI 3:04 PM</p>

            <div class="flex flex-row justify-end">
                <div class="messages text-sm text-white grid grid-flow-row gap-0.5">
                    <div class="flex items-center flex-row-reverse group">
                        <p class="px-6 py-3 rounded-t-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Hey! How
                            are
                            you?</p>
                    </div>
                    <div class="flex items-center flex-row-reverse group">
                        <p class="px-6 py-3 rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Shall we go for Hiking
                            this
                            weekend?</p>
                    </div>
                    <div class="flex items-center flex-row-reverse group">
                        <p class="px-6 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Lorem
                            ipsum
                            dolor sit
                            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.</p>
                    </div>
                </div>
            </div>

            <p class="p-4 text-center text-sm text-gray-500">SAT 2:10 PM</p>

            <div class="flex flex-row justify-start">
                <el-avatar
                    :src="data.avatar"
                    :size="35"
                    class="border mr-4"
                />

                <div class="messages text-sm text-gray-700 grid grid-flow-row gap-0.5">
                    <div class="flex items-center group">
                        <p class="px-6 py-3 rounded-t-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Hey! How
                            are
                            you?</p>

                    </div>
                    <div class="flex items-center group">
                        <p class="px-6 py-3 rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Shall we go for Hiking
                            this
                            weekend?</p>

                    </div>
                    <div class="flex items-center group">
                        <p class="px-6 py-3 rounded-b-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Lorem
                            ipsum
                            dolor sit
                            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.</p>

                    </div>
                </div>
            </div>

            <p class="p-4 text-center text-sm text-gray-500">12:40 PM</p>

            <div class="flex flex-row justify-end">
                <div class="messages text-sm text-white grid grid-flow-row gap-0.5">
                    <div class="flex items-center flex-row-reverse group">
                        <p class="px-6 py-3 rounded-t-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Hey! How
                            are
                            you?</p>

                    </div>
                    <div class="flex items-center flex-row-reverse group">
                        <p class="px-6 py-3 rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Shall we go for Hiking
                            this
                            weekend?</p>

                    </div>
                    <div class="flex items-center flex-row-reverse group">
                        <a class="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md" href="#">
                            <img class="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                                 src="https://unsplash.com/photos/8--kuxbxuKU/download?force=true&w=640"
                                 alt="hiking"/>
                        </a>

                    </div>
                    <div class="flex items-center flex-row-reverse group">
                        <p class="px-6 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Lorem
                            ipsum
                            dolor sit
                            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.</p>

                    </div>
                </div>
            </div>
        </div>

        <div class="cover-bar"></div>

        <div class="chat-footer">
            <div class="flex flex-row items-center justify-center p-4 gap-4">
                <svg-icons name="icon-plus-circle" color="#2563eb" size="24" class="cursor-pointer"/>

                <svg-icons name="icon-picture" color="#2563eb" size="24" class="cursor-pointer"/>

                <svg-icons name="icon-camera2" color="#2563eb" size="24" class="cursor-pointer"/>

                <svg-icons name="icon-voice" color="#2563eb" size="24" class="cursor-pointer"/>

                <div class="relative flex-grow">
                    <input
                        class="rounded-full py-2 pl-3 pr-10 w-full border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none text-gray-600 transition duration-200 ease-in"
                        type="text" placeholder="Aa"/>
                    <span class="absolute top-0 bottom-0 flex items-center right-2.5">
                        <svg-icons name="icon-emoji" color="#2563eb" size="24" class="cursor-pointer"/>
                    </span>
                </div>

                <svg-icons name="icon-like" color="#2563eb" size="24" class="cursor-pointer"/>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.chat-body::-webkit-scrollbar {
    width: .4em;
}

.chat-body::-webkit-scrollbar,
.chat-body::-webkit-scrollbar-thumb {
    overflow: visible;
    border-radius: 4px;
}

.chat-body::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .2);
}

.cover-bar {
    position: absolute;
    background: #ffffff;;
    height: 100%;
    top: 0;
    right: 0;
    width: .4em;
    -webkit-transition: all .5s;
    opacity: 1;
}
</style>