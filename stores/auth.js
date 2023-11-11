import { defineStore } from "pinia";

const userLocalStorage = () => {
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
    }
    return null;
}

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: userLocalStorage(),
            userList: [],
            friendList: [],
            friendRequest: [],
        }
    },
    getters: {
        getUser: state => state.user,
        getUserList: state => state.userList,
        getFriendList: state => state.friendList,
        getFriendRequest: state => state.friendRequest,
    },
    actions: {
        setUser(data) {
            this.$state.user = data;
            localStorage.setItem("user", JSON.stringify(data));

            // console.log(data);
        },
        deleteUser() {
            this.$state.user = null;
            localStorage.removeItem("user");
        },
        setUserList(data) {
            this.$state.userList = data;
        },
        deleteUserList() {
            this.$state.userList = [];
        },
        setFriendList(data) {
            this.$state.friendList = data;
        },
        deleteFriendList() {
            this.$state.friendList = [];
        },
        setFriendRequest(data) {
            this.$state.friendRequest = data;
        },
        deleteFriendRequest() {
            this.$state.friendRequest = [];
        }
    },
})