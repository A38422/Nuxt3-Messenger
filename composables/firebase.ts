import {initializeApp} from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
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
    orderBy
} from "firebase/firestore";

import Filter from "bad-words";

import {useAuthStore} from '@/stores/auth'
import {useChatStore} from "~/stores/chat";

const runtimeConfig = useRuntimeConfig()

const app = initializeApp({
    apiKey: runtimeConfig.public.apiKey,
    authDomain: runtimeConfig.public.authDomain,
    projectId: runtimeConfig.public.projectId,
    storageBucket: runtimeConfig.public.storageBucket,
    messagingSenderId: runtimeConfig.public.messagingSenderId,
    appId: runtimeConfig.public.appId,
    measurementId: runtimeConfig.public.measurementId
});

const auth = getAuth();

const firestore = getFirestore(app);

const filter = new Filter();

export const useAuth = () => {
    const authStore = useAuthStore();
    let user = computed(() => authStore.$state.user);

    const signIn = async () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider).then((result) => {
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
        await auth.signOut();
    };

    const saveUserDataToFirestore = async (user: any) => {
        try {
            const {uid, displayName, email, photoURL} = user;

            const userCollection = collection(firestore, "Users");

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
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const updateNotificationSettings = async (notificationSetting: Boolean) => {
        try {
            const userRef = doc(collection(firestore, "Users"), user.value.userID);
            await updateDoc(userRef, {notificationSettings: notificationSetting});
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const blockUser = async (blockedUserID: any) => {
        try {
            const userRef = doc(collection(firestore, "Users"), user.value.userID);
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
        try {
            const userRef = doc(collection(firestore, "Users"), user.value.userID);
            await updateDoc(userRef, {blockedUsers: arrayRemove(unBlockedUserID)})

            authStore.setUser({
                ...user.value,
                blockedUsers: user.value.blockedUsers.filter((i: any) => i !== unBlockedUserID)
            });
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const updateLastSeenTime = async () => {
        try {
            const userRef = doc(collection(firestore, "Users"), user.value.userID);

            const lastSeenTime = new Date();

            await updateDoc(userRef, {lastSeen: lastSeenTime});

            authStore.setUser({
                ...user.value,
                lastSeen: lastSeenTime
            });
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const checkUserOnlineStatus = async () => {
        const userRef = doc(collection(firestore, "Users"), user.value.userID);

        return onSnapshot(userRef, snapshot => {
            const lastSeen = snapshot.data()?.lastSeen;

            if (lastSeen) {
                // @ts-ignore
                const timeAgo = new Date() - lastSeen;

                return timeAgo < 5 * 60 * 1000;
            }
        }, (error) => {
            console.error("error: ", error);
            return false;
        });
    };

    const sendFriendRequest = async (receiverID: any) => {
        try {
            const friendRequestsCollection = collection(firestore, "FriendRequests");

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
        try {
            const friendRequestRef = doc(collection(firestore, "FriendRequests"), requestID);
            const friendRequestDoc = await getDoc(friendRequestRef);
            const data = friendRequestDoc.data();

            await updateDoc(friendRequestRef, {status: "accepted"});
            await addFriendToFriendList(data?.receiverID);
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const rejectFriendRequest = async (requestID: any) => {
        try {
            const friendRequestRef = doc(collection(firestore, "FriendRequests"), requestID);

            await updateDoc(friendRequestRef, {status: "rejected"});
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const addFriendToFriendList = async (friendID: any) => {
        try {
            const userRef = doc(collection(firestore, "Users"), user.value.userID);
            const userDoc = await getDoc(userRef);

            const friendRef = doc(collection(firestore, "Users"), friendID);
            const friendDoc = await getDoc(friendID);

            await updateDoc(userRef, {friendList: arrayUnion(friendDoc.data())});
            await updateDoc(friendRef, {friendList: arrayUnion(userDoc.data())});

            authStore.setUser({
                ...user.value,
                friendList: [...user.value.friendList, friendDoc.data()]
            });
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const getFriendList = async () => {
        const friendList = ref<any>([]);

        const userRef = doc(collection(firestore, "Users"), user.value.userID);

        await getDoc(userRef).then((querySnapshot) => {
            friendList.value = querySnapshot.data()?.friendList || [];
        }, error => {
            console.log("error: ", error);
        })

        return friendList;
    };

    const getUserList = async () => {
        let userList: any[] = [];

        try {
            const userRef = collection(firestore, "Users");
            const querySnapshot = await getDocs(userRef);
            userList = querySnapshot.docs.map(i => i.data()).filter(o => {
                return user.value.userID !== o.userID;
            });
        } catch (error) {
            console.log("error: ", error);
        }

        return userList;
    };

    const getBlockedUsersList = async () => {
        const blockedList = ref<any>([]);

        const userRef = doc(collection(firestore, "Users"), user.value.userID);

        await getDoc(userRef).then((querySnapshot) => {
            blockedList.value = querySnapshot.data()?.blockedUsers || [];
        }, error => {
            console.log("error: ", error);
        })

        return blockedList;
    };

    const searchUsersByKeyword = async (keyword: String) => {
        const data = ref<any>([]);
        const usersRef = collection(firestore, "Users");

        const usersQuery = query(usersRef, where('Keywords', 'array-contains', keyword));
        await getDocs(usersQuery).then((querySnapshot) => {
            data.value = querySnapshot.docs.map(i => i.data());
        }, (error) => {
            console.error("error: ", error);
        });
    };

    return {
        user,
        signIn,
        signOut,
        addFriendToFriendList,
        acceptFriendRequest,
        rejectFriendRequest,
        sendFriendRequest,
        blockUser,
        unblockUser,
        updateLastSeenTime,
        updateNotificationSettings,
        checkUserOnlineStatus,
        getUserList,
        getFriendList,
        getBlockedUsersList,
        searchUsersByKeyword
    }
};

export const useChat = () => {
    const chatStore = useChatStore();
    const {user} = useAuth();

    const createChat = async (participants: any) => {
        let chat: any = null;
        const chatCollection = collection(firestore, "Chats");

        try {
            const chatRef = await addDoc(chatCollection, {
                userID: user.value.userID,
                participant: {...participants},
                Messages: [],
                action: {
                    read: false,
                    notification: false,
                }
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

    const updateChat = async (chatID: any, participant: any) => {
        const chatsRef = doc(collection(firestore, "Chats"), chatID);

        try {
            await setDoc(chatsRef, {participant: participant}, {merge: true});
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const updateChatNotificationSettings = async (chatID: any, notificationSetting: any) => {
        const chatsRef = doc(collection(firestore, "Chats"), chatID);

        try {
            await setDoc(chatsRef, {notificationSetting: notificationSetting}, {merge: true});
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const getChatList = async () => {
        const chatsRef = collection(firestore, "Chats");

        await onSnapshot(chatsRef, snapshot => {
            const result = snapshot.docs.map(i => {
                return {
                    ...i.data(),
                    id: i.id,
                }
            }).filter(o => {
                // @ts-ignore
                return o?.participant.userID === user.value.userID || o?.userID === user.value.userID;
            });

            chatStore.setChats(result);
        }, (error) => {
            console.error("error: ", error);
        });
    };

    const getMessagesInChat = async (chatID: any) => {
        const messagesRef = collection(doc(collection(firestore, "Chats"), chatID), "Messages");
        const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));

        await onSnapshot(messagesQuery, snapshot => {
            const result = snapshot.docs.map(i => {
                return {
                    ...i.data(),
                    id: messagesRef.id
                }
            }).reverse();
            chatStore.setMessages(result);
        }, (error) => {
            console.error("error: ", error);
        });
    };

    const sendMessage = async (chatID: any, content: any) => {
        if (!user) return;

        const messagesRef = collection(doc(collection(firestore, "Chats"), chatID), "Messages");
        try {
            await addDoc(messagesRef, {
                id: messagesRef.id,
                senderID: user.value.userID,
                content: filter.clean(content),
                timestamp: serverTimestamp()
            });
        } catch (e) {
            console.error("error: ", e);
        }
    };

    return {
        createChat,
        updateChat,
        sendMessage,
        getChatList,
        getMessagesInChat,
        updateChatNotificationSettings,
    }
};
