import {initializeApp} from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from 'firebase/auth';
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    serverTimestamp,
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDocs,
    where,
    orderBy,
    deleteDoc,
} from "firebase/firestore";
// @ts-ignores
import {v4 as uuidv4} from 'uuid';


const runtimeConfig = useRuntimeConfig();

const app = initializeApp({
    apiKey: runtimeConfig.public.apiKey,
    authDomain: runtimeConfig.public.authDomain,
    projectId: runtimeConfig.public.projectId,
    storageBucket: runtimeConfig.public.storageBucket,
    messagingSenderId: runtimeConfig.public.messagingSenderId,
    appId: runtimeConfig.public.appId,
    measurementId: runtimeConfig.public.measurementId
});

const $auth = getAuth();
const $firestore = getFirestore(app);

export const useAuth = () => {
    const authStore = useAuthStore();
    const chatStore = useChatStore();
    const {getChatList, getMessagesInChat} = useChat();

    const user = computed(() => authStore.$state.user);

    onAuthStateChanged($auth, async _user => {
        if (_user) {
            await updateLastSeenTime("online");
        }
    });


    const signIn = async () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup($auth, googleProvider).then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            saveUserDataToFirestore(result?.user);
        }).catch((error) => {
            console.log("error: ", error.message);
        });
    };

    const signOut = async () => {
        await updateLastSeenTime();
        await authStore.deleteUser();
        await authStore.deleteUserList();
        await authStore.deleteFriendList();
        await authStore.deleteFriendRequest();
        await chatStore.clearChat();
        await $auth.signOut();
    };

    const saveUserDataToFirestore = async (user: any) => {
        try {
            const {uid, displayName, email, photoURL} = user;

            const userCollection = collection($firestore, "Users");

            const userDoc = doc(userCollection, uid);

            const docSnapshot = await getDoc(userDoc);
            if (!docSnapshot.exists()) {
                await setDoc(userDoc, {
                    userID: uid,
                    userName: displayName,
                    email: email,
                    photoUrl: photoURL,
                    blockedUsers: [],
                    friendList: [],
                    notificationSettings: null,
                    lastSeen: null
                });

                getDoc(doc(userCollection, uid)).then(r => {
                    authStore.setUser(r.data())
                });
            } else {
                authStore.setUser({
                    ...docSnapshot.data(),
                    lastSeen: null
                });
            }

            await updateLastSeenTime("online");
            getUserList();
            getChatList();
            getFriendList();
            getFriendRequest();

        } catch (error) {
            console.error("error: ", error);
        }
    };

    const updateAvatar = async (avatar: String) => {
        if (!user.value) return;

        try {
            const userRef = doc(collection($firestore, "Users"), user.value.userID);
            await updateDoc(userRef, {photoUrl: avatar});

            authStore.setUser({
                ...user.value,
                photoUrl: avatar
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const updateInfo = async (data: any) => {
        if (!user.value) return;

        try {
            const userRef = doc(collection($firestore, "Users"), user.value.userID);
            await setDoc(userRef, data, {merge: true});

            authStore.setUser({
                ...user.value,
                ...data
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const updateNotificationSettings = async (notificationSetting: Boolean) => {
        if (!user.value) return;

        try {
            const userRef = doc(collection($firestore, "Users"), user.value.userID);
            await updateDoc(userRef, {notificationSettings: notificationSetting});
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const blockUser = async (blockedUserID: any) => {
        if (!user.value) return;

        try {
            const userRef = doc(collection($firestore, "Users"), user.value.userID);
            await updateDoc(userRef, {blockedUsers: arrayUnion(blockedUserID)})

            authStore.setUser({
                ...user.value,
                blockedUsers: [...user.value.blockedUsers, blockedUserID]
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const unblockUser = async (unBlockedUserID: any) => {
        if (!user.value) return;

        try {
            const userRef = doc(collection($firestore, "Users"), user.value.userID);
            await updateDoc(userRef, {blockedUsers: arrayRemove(unBlockedUserID)})

            authStore.setUser({
                ...user.value,
                blockedUsers: user.value.blockedUsers.filter((i: any) => i !== unBlockedUserID)
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const updateLastSeenTime = async (status?: any) => {
        if (user.value) {
            try {
                const userRef = doc(collection($firestore, "Users"), user.value.userID);

                const lastSeenTime = status || new Date();

                await updateDoc(userRef, {lastSeen: lastSeenTime});

                authStore.setUser({
                    ...user.value,
                    lastSeen: lastSeenTime
                });
            } catch (error) {
                console.error("error: ", error);
            }
        }
    };

    const sendFriendRequest = async (receiverID: any) => {
        if (!user.value) return;

        try {
            const friendRequestsCollection = collection($firestore, "FriendRequests");

            await addDoc(friendRequestsCollection, {
                senderID: user.value.userID,
                receiverID: receiverID,
                status: "pending"
            });
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const acceptFriendRequest = async (requestID: any) => {
        if (!user.value) return;

        try {
            const friendRequestRef = doc(collection($firestore, "FriendRequests"), requestID);
            const friendRequestDoc = await getDoc(friendRequestRef);
            const data = friendRequestDoc.data();

            // await updateDoc(friendRequestRef, {status: "accepted"});
            await deleteDoc(friendRequestRef);
            await addFriendToFriendList(data?.senderID);
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const rejectFriendRequest = async (requestID: any) => {
        if (!user.value) return;

        try {
            const friendRequestRef = doc(collection($firestore, "FriendRequests"), requestID);

            await deleteDoc(friendRequestRef);
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const addFriendToFriendList = async (friendID: any) => {
        if (!user.value) return;

        try {
            const userRef = doc(collection($firestore, "Users"), user.value.userID);
            const friendRef = doc(collection($firestore, "Users"), friendID);

            await updateDoc(userRef, {friendList: arrayUnion(friendID)});
            await updateDoc(friendRef, {friendList: arrayUnion(user.value.userID)});

            authStore.setUser({
                ...user.value,
                friendList: [...user.value.friendList, friendID]
            });
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const unFriend = async (friendID: any) => {
        if (!user.value) return;

        try {
            const userRef = doc(collection($firestore, "Users"), user.value.userID);
            const friendRef = doc(collection($firestore, "Users"), friendID);

            await updateDoc(userRef, {friendList: arrayRemove(friendID)});
            await updateDoc(friendRef, {friendList: arrayRemove(user.value.userID)});

            authStore.setUser({
                ...user.value,
                friendList: user.value.friendList.filter((i: any) => i.userID !== friendID)
            });
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const unsubscribeFriendRequest = ref<any>(null);
    const getFriendRequest = () => {
        if (!user.value) return;

        try {
            const friendRequestsCollection = collection($firestore, "FriendRequests");

            unsubscribeFriendRequest.value = onSnapshot(friendRequestsCollection, snapshot => {
                const result = snapshot.docs.map(i => {
                    return {
                        ...i.data(),
                        id: i.id,
                    }
                });
                authStore.setFriendRequest(result);
            });
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const unsubscribeFriendList = ref<any>(null);
    const getFriendList = () => {
        if (!user.value) return;

        const userRef = doc(collection($firestore, "Users"), user.value.userID);

        unsubscribeFriendList.value = onSnapshot(userRef, snapshot => {
            if (user.value) {
                const result = snapshot.data()?.friendList || [];
                authStore.setFriendList(result);
            }
        }, (error) => {
            console.error("error: ", error);
        });
    };

    const unsubscribeUserList = ref<any>(null);
    const getUserList = () => {
        if (!user.value) return;

        // @ts-ignore
        const userRef = collection($firestore, "Users");

        unsubscribeUserList.value = onSnapshot(userRef, snapshot => {
            if (user.value) {
                const result = snapshot.docs.map(i => i.data()).filter(o => {
                    return user.value.userID !== o.userID;
                });
                authStore.setUserList(result);
            }
        }, (error) => {
            console.error("error: ", error);
        });
    };

    const getBlockedUsersList = async () => {
        const blockedList = ref<any>([]);

        if (user.value) {
            const userRef = doc(collection($firestore, "Users"), user.value.userID);

            await getDoc(userRef).then((querySnapshot) => {
                blockedList.value = querySnapshot.data()?.blockedUsers || [];
            }, error => {
                console.log("error: ", error);
            })
        }

        return blockedList;
    };

    const searchUsersByKeyword = async (keyword: String) => {
        const data = ref<any>([]);
        const usersRef = collection($firestore, "Users");

        const usersQuery = query(usersRef, where('Keywords', 'array-contains', keyword));
        await getDocs(usersQuery).then((querySnapshot) => {
            data.value = querySnapshot.docs.map(i => i.data());
        }, (error) => {
            console.error("error: ", error);
        });
    };

    onUnmounted(() => {
        unsubscribeUserList.value?.();
        unsubscribeFriendList.value?.();
        unsubscribeFriendRequest.value?.();
    });

    window.addEventListener('beforeunload', (event) => {
        updateLastSeenTime();
    });

    return {
        user,
        signIn,
        signOut,
        updateAvatar,
        acceptFriendRequest,
        rejectFriendRequest,
        sendFriendRequest,
        unFriend,
        blockUser,
        unblockUser,
        updateLastSeenTime,
        updateNotificationSettings,
        updateInfo,
        getFriendRequest,
        getUserList,
        getFriendList,
        getBlockedUsersList,
        searchUsersByKeyword
    }
};

export const useChat = () => {
    const authStore = useAuthStore();
    const chatStore = useChatStore();

    const user = computed(() => authStore.$state.user);
    const chatID = computed(() => chatStore.$state.chatID);

    const createChat = async (friend: any) => {
        const {checkExistChat} = useUtils();

        let [isExists, chat] = checkExistChat(user.value.userID, friend.userID);

        if (isExists) {
            return chat;
        }

        const chatCollection = collection($firestore, "Chats");

        try {
            const chatRef = await addDoc(chatCollection, {
                participants: [{...friend}, {...user.value}],
                Messages: [],
                action: {
                    read: false,
                    notification: false,
                },
                updatedTime: serverTimestamp(),
            });

            await getDoc(doc(chatCollection, chatRef.id)).then(r => {
                chat = {
                    ...r.data(),
                    id: chatRef.id
                };
            });
        } catch (e) {
            console.log("error: ", e);
        }

        return chat;
    };

    const updateChat = (chatID: any, action: any) => {
        const chatsRef = doc(collection($firestore, "Chats"), chatID);

        try {
            setDoc(chatsRef, {action: action}, {merge: true});
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const deleteChat = async (chatID: any) => {
        const chatsRef = doc(collection($firestore, "Chats"), chatID);

        try {
            await deleteDoc(chatsRef);
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const updateChatNotificationSettings = async (chatID: any, notificationSetting: any) => {
        const chatsRef = doc(collection($firestore, "Chats"), chatID);

        try {
            await setDoc(chatsRef, {notificationSetting: notificationSetting}, {merge: true});
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const unsubscribeChatList = ref<any>(null);
    const getChatList = () => {
        if (!user.value) return;
        const chatsRef = collection($firestore, "Chats");
        const chatsQuery = query(chatsRef, orderBy('updatedTime', 'desc'));

        unsubscribeChatList.value = onSnapshot(chatsQuery, snapshot => {
            const result = snapshot.docs.map(i => {
                return {
                    ...i.data(),
                    id: i.id,
                }
            }).filter(o => {
                // @ts-ignore
                if (o && o.participants) {
                    // @ts-ignore
                    return Boolean(o.participants.find((x: any) => x.userID === user.value.userID));
                }
                return false;
            });

            chatStore.setChats(result);
        }, (error) => {
            console.error("error: ", error);
        });
    };

    const unsubscribeMessagesInChat = ref<any>(null);
    const getMessagesInChat = (id?: any) => {
        const route = useRoute();

        const temp = id || chatID.value || route.query.chatId;

        if (temp) {
            // @ts-ignore
            const messagesRef = collection(doc(collection($firestore, "Chats"), temp), "Messages");
            const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));

            unsubscribeMessagesInChat.value = onSnapshot(messagesQuery, snapshot => {
                const result = snapshot.docs.map(i => {
                    return {
                        ...i.data(),
                        id: messagesRef.id
                    }
                }).reverse()

                chatStore.setMessages(result);
            }, (error) => {
                console.error("error: ", error);
            });
        }
    };

    const sendMessage = async (chatID: any, content: any) => {
        if (!user.value) return;

        try {
            const messageRef = doc(collection($firestore, "Chats"), chatID);
            await setDoc(messageRef, {
                Messages: arrayUnion({
                    id: uuidv4(),
                    senderID: user.value.userID,
                    content: content,
                    timestamp: new Date()
                }),
                updatedTime: new Date(),
                action: {
                    notification: false,
                    read: true
                },
            }, {merge: true})
        } catch (e) {
            console.error("error: ", e);
        }
    };

    onUnmounted(() => {
        unsubscribeMessagesInChat.value?.();
        unsubscribeChatList.value?.();
    });

    return {
        createChat,
        updateChat,
        deleteChat,
        sendMessage,
        getChatList,
        getMessagesInChat,
        updateChatNotificationSettings,
    }

};
