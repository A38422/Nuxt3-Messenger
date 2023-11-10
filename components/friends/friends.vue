<script setup lang="ts">

import {Search} from "@element-plus/icons-vue";
import CardUser from "@/components/friends/card-user.vue";
import {useLoading} from "@/composables/states";
import type {TabsPaneContext} from "element-plus";

const router = useRouter();
const authStore = useAuthStore();
const chatStore = useChatStore();
const {sendFriendRequest, acceptFriendRequest, rejectFriendRequest, unFriend} = useAuth();
const {createChat} = useChat();

const loading = useLoading();

const user = computed<any>(() => authStore.$state.user);
const users = computed<any>(() => authStore.$state.userList);
const friends = computed<any>(() => authStore.$state.friendList);
const friendRequest = computed<any>(() => authStore.$state.friendRequest);

const valueInput = ref("");
const activeName = ref("friends");
const dataTable = ref<any>([]);

watch(friends, newValue => {
    if (user.value && activeName.value === "friends") {
        dataTable.value = newValue.map((i: any) => {
            return users.value.find((x: any) => x.userID === i);
        });
    }
}, {deep: true, immediate: true})

const handleSearch = (value: any) => {
    switch (activeName.value) {
        case "friends":
            dataTable.value = friends.value
                .map((i: any) => {
                    return users.value.find((x: any) => x.userID === i);
                })
                .filter((i: any) => {
                    return i.userName.toLowerCase().includes(value.toLowerCase());
                });
            break;
        case "friends-request":
            const request = users.value.filter((i: any) => {
                return friendRequest.value.find((o: any) => o.receiverID === user.value.userID && o.status === "pending" && o.senderID === i.userID);
            });
            dataTable.value = [...request.filter((i: any) => {
                return i.userName.toLowerCase().includes(value.toLowerCase());
            })];
            break;
        case "invitation-sent":
            const invitation = users.value.filter((i: any) => {
                return friendRequest.value.find((o: any) => o.receiverID === i.userID && o.status === "pending" && o.senderID === user.value.userID);
            });
            dataTable.value = [...invitation.filter((i: any) => {
                return i.userName.toLowerCase().includes(value.toLowerCase());
            })];
            break;
        case "other":
            const other = users.value.filter((i: any) => {
                return !friendRequest.value.find((o: any) => o.receiverID === i.userID && o.status === "pending");
            });
            dataTable.value = [...other.filter((i: any) => !friends.value.find((o: any) => o === i.userID) && i.userName.toLowerCase().includes(value.toLowerCase()))];
            break;
    }
};

const handleCreateChat = async (value: any) => {
    loading.value = true;
    const result = await createChat(value);

    chatStore.setChatID(result.id);

    setTimeout(async () => {
        if (result) await router.push({
            path: '/',
            query: {
                chatId: result.id
            },
        });
    }, 100);
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
    if (activeName.value === tab.paneName || !user.value) return;

    switch (tab.paneName) {
        case "friends":
            dataTable.value = friends.value.map((i: any) => {
                return users.value.find((x: any) => x.userID === i);
            });
            break;
        case "friends-request":
            const request = users.value.filter((i: any) => {
                return friendRequest.value.find((o: any) => o.receiverID === user.value.userID && o.status === "pending" && o.senderID === i.userID);
            });
            dataTable.value = [...request];
            break;
        case "invitation-sent":
            const invitation = users.value.filter((i: any) => {
                return friendRequest.value.find((o: any) => o.receiverID === i.userID && o.status === "pending" && o.senderID === user.value.userID);
            });
            dataTable.value = [...invitation];
            break;
        case "other":
            const other = users.value.filter((i: any) => {
                return !friendRequest.value.find((o: any) => o.receiverID === i.userID && o.status === "pending");
            });
            dataTable.value = [...other.filter((i: any) => !friends.value.find((o: any) => o === i.userID))];
            break;
    }
};

const handleAddFriend = (receiverID: any) => {
    const request = friendRequest.value.find((i: any) => i.receiverID === user.value.userID && i.senderID === receiverID);

    if (request && request.id) {
        acceptFriendRequest(request.id);
    } else {
        sendFriendRequest(receiverID);
    }
    dataTable.value = dataTable.value.filter((i: any) => i.userID !== receiverID);
};



const handleAccepted = (receiverID: any) => {
    const request = friendRequest.value.find((i: any) => i.receiverID === user.value.userID && i.senderID === receiverID);

    if (request && request.id) {
        acceptFriendRequest(request.id);
        dataTable.value = dataTable.value.filter((i: any) => i.userID !== receiverID);
    }
};

const handleRejected = (receiverID: any) => {
    const request = friendRequest.value.find((i: any) => i.receiverID === user.value.userID && i.senderID === receiverID);

    if (request && request.id) {
        rejectFriendRequest(request.id);
        dataTable.value = dataTable.value.filter((i: any) => i.userID !== receiverID);
    }
};

const handleCancelRequest = (receiverID: any) => {
    const request = friendRequest.value.find((i: any) => i.receiverID === receiverID && i.senderID === user.value.userID);

    if (request && request.id) {
        rejectFriendRequest(request.id);
        dataTable.value = dataTable.value.filter((i: any) => i.userID !== receiverID);
    }
};

const messageUnF = (receiverID: any) => {
    const nameUnF = dataTable.value.find((i: any) => i.userID === receiverID);

    ElMessageBox.confirm(
        `Messenger will be remove ${nameUnF.userName} from your friends list. Continue?`,
        'Confirm',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }
    ).then(() => {
        unFriend(receiverID);
        dataTable.value = dataTable.value.filter((i: any) => i.userID !== receiverID);

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

</script>

<template>
    <div class="w-full h-full flex flex-col p-5">
        <div class="flex items-center justify-between pb-1">
            <p class="font-semibold text-xl">Friends</p>
            <div class="input-search__list-message w-1/4">
                <el-input v-model="valueInput"
                          placeholder="Search"
                          size="large"
                          :prefix-icon="Search"
                          @input="handleSearch"/>
            </div>
        </div>

        <el-tabs v-model="activeName" class="w-full" @tab-click="handleClick">
            <el-tab-pane label="All friends" name="friends">
                <div v-if="user && dataTable && dataTable.length > 0"
                     class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in dataTable"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                        <el-button @click="messageUnF(item.userID)">
                            Unfriend
                        </el-button>
                    </card-user>
                </div>
                <NuxtLayout v-else name="error" class="flex items-center"/>
            </el-tab-pane>

            <el-tab-pane label="Friend requests" name="friends-request">
                <div v-if="user && dataTable && dataTable.length > 0"
                     class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in dataTable"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                        <el-button @click="handleAccepted(item.userID)">
                            Accept
                        </el-button>
                        <el-button @click="handleRejected(item.userID)">
                            Reject
                        </el-button>
                    </card-user>
                </div>
                <NuxtLayout v-else name="error" class="flex items-center"/>
            </el-tab-pane>

            <el-tab-pane label="Invitation sent" name="invitation-sent">
                <div v-if="user && dataTable && dataTable.length > 0"
                     class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in dataTable"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                        <el-button @click="handleCancelRequest(item.userID)">
                            Cancel request
                        </el-button>
                    </card-user>
                </div>
                <NuxtLayout v-else name="error" class="flex items-center"/>
            </el-tab-pane>

            <el-tab-pane label="Other" name="other">
                <div v-if="user && dataTable && dataTable.length > 0"
                     class="w-full overflow-auto flex flex-wrap gap-4">
                    <card-user v-for="item in dataTable"
                               :key="item.userID"
                               :user="item"
                               @on-create-chat="handleCreateChat">
                        <el-button @click="handleAddFriend(item.userID)">
                            Add friend
                        </el-button>
                    </card-user>
                </div>
                <NuxtLayout v-else name="error" class="flex items-center"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">

</style>