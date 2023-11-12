import {initializeApp} from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
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
import {getMessaging, getToken, onMessage} from "firebase/messaging";

const runtimeConfig = useRuntimeConfig();

const app = initializeApp({
    apiKey: runtimeConfig.public.apiKey,
    authDomain: runtimeConfig.public.authDomain,
    projectId: runtimeConfig.public.projectId,
    storageBucket: runtimeConfig.public.storageBucket,
    messagingSenderId: runtimeConfig.public.messagingSenderId,
    appId: runtimeConfig.public.appId,
    measurementId: runtimeConfig.public.measurementId,
    databaseURL: runtimeConfig.public.databaseURL
});

const $auth = getAuth();
const $firestore = getFirestore(app);
const $messaging = getMessaging(app);
onMessage($messaging, (payload) => {
    console.log('Message received. ', payload);
    let check = true;

    document.body.addEventListener("click", function () {
        if (check) {
            // document.getElementById("notification-sound").muted = false;
            // document.getElementById("notification-sound").play();
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3");
            audio.play();
            check = false;
        }
    });
});

const tokenDevice = ref<any>("");
getToken($messaging, {
    vapidKey: runtimeConfig.public.vapidKey,
}).then((currentToken) => {
    if (currentToken) {
        tokenDevice.value = currentToken;

        setTimeout(async () => {
            const {setTokenDevice} = useAuth();
            await setTokenDevice(tokenDevice.value)
        }, 2000);

    } else {
        console.log('No registration token available. Request permission to generate one.');
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});

export const useAuth = () => {
    const router = useRouter();
    const authStore = useAuthStore();
    const chatStore = useChatStore();
    const {getChatList, getMessagesInChat} = useChat();

    const user = computed(() => authStore.$state.user);

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

    const signInWithEmail = async (data: any) => {
        return await signInWithEmailAndPassword($auth, data.email, data.password).then((result) => {
            saveUserDataToFirestore(result?.user);
            return true;
        }).catch((error) => {
            console.log("error: ", error.message);
            return false;
        });
    };

    const signOut = async () => {
        await updateLastSeenTime();
    };

    const signUp = async (data: any) => {
        return await createUserWithEmailAndPassword($auth, data.email, data.password)
            .then(async (userCredential) => {
                const newUser = {
                    ...userCredential.user,
                    displayName: data.firstName + ' ' + data.lastName,
                    photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                };

                await saveUserDataToFirestore(newUser);
                return true;
        }, (error) => {
            console.log("error: ", error.message)
            return false;
        });
    };

    const saveUserDataToFirestore = async (_user: any) => {
        try {
            const {uid, displayName, email, photoURL} = _user;

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
                    lastSeen: null,
                    phone: null,
                    address: null,
                    education: null,
                    company: null,
                    tokenDevice: tokenDevice.value
                });

                await getDoc(doc(userCollection, uid)).then(async r => {
                    authStore.setUser({
                        ...r.data(),
                        lastSeen: "online",
                        tokenDevice: tokenDevice.value
                    });

                    getUserList();
                    getChatList();
                    getFriendList();
                    getFriendRequest();

                    await router.push('/');
                });
            } else {
                if (tokenDevice.value) {
                    await setDoc(userDoc, {
                        tokenDevice: tokenDevice.value
                    }, {merge: true});
                }

                authStore.setUser({
                    ...docSnapshot.data(),
                    lastSeen: "online",
                    tokenDevice: tokenDevice.value
                });

                getUserList();
                getChatList();
                getFriendList();
                getFriendRequest();

                await router.push('/');
            }
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

    const setTokenDevice = async (token: String) => {
        if (!user.value) return;

        try {
            const userRef = doc(collection($firestore, "Users"), user.value.userID);
            await setDoc(userRef, {tokenDevice: token}, {merge: true});

            authStore.setUser({
                ...user.value,
                tokenDevice: token
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

    const updateLastSeenTime = async (status?: any, unload?: any) => {
        if (user.value) {
            try {
                const userRef = doc(collection($firestore, "Users"), user.value.userID);

                const lastSeenTime = status || new Date();

                await updateDoc(userRef, {lastSeen: lastSeenTime});

                authStore.setUser({
                    ...user.value,
                    lastSeen: lastSeenTime
                });

                if (lastSeenTime !== 'online' && !unload) {
                    await authStore.deleteUser();
                    await authStore.deleteUserList();
                    await authStore.deleteFriendList();
                    await authStore.deleteFriendRequest();
                    await chatStore.clearChat();
                    await $auth.signOut();
                    await router.push('/login');
                }
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

    window.addEventListener('beforeunload', async (event) => {
        await updateLastSeenTime(null, true);
    });

    return {
        user,
        signIn,
        signOut,
        signUp,
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
        searchUsersByKeyword,
        signInWithEmail,
        setTokenDevice
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
                    return Boolean(o.participants.find((x: any) => user.value && x.userID === user.value.userID));
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

    const sendMessage = async (chatID: any, content: any, name: any, tokenDevice: any, image: any) => {
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
            }, {merge: true});


            useFetch(`/api/send-notification`, {
                method: 'POST',
                body: {
                    name: name,
                    content: content,
                    tokenDevice: tokenDevice,
                    image: image
                }
            });
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