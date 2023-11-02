import {initializeApp} from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import {
    collection,
    query,
    limit,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove, getDocs, where
} from "firebase/firestore";

import Filter from "bad-words";

const app = initializeApp({
    apiKey: "AIzaSyCZigN06suPXsElTYF3WjDeZbm27vf16ig",
    authDomain: "nuxt3-messenger.firebaseapp.com",
    projectId: "nuxt3-messenger",
    storageBucket: "nuxt3-messenger.appspot.com",
    messagingSenderId: "727359037732",
    appId: "1:727359037732:web:04e2cbbad7ad73701353b1",
    measurementId: "G-0QBTGPG6EJ"
});

const auth = getAuth();

const firestore = getFirestore(app);

const filter = new Filter();

export const useAuth = () => {
    const user = ref<any>(null);
    const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user));
    const isLogin = computed(() => user.value !== null);

    const signIn = async () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider).then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            saveUserDataToFirestore(result.user);
        }).catch((error) => {
            console.log("error: ", error.message);
        });
    };
    const signOut = async () => {
        await updateLastSeenTime(user.value.userID);
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
                    user.value = r.data();
                });
            } else {
                user.value = {
                    ...docSnapshot.data(),
                    lastSeen: null
                };
            }
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const updateNotificationSettings = async (userID: any, notificationSetting: Boolean) => {
        try {
            const userRef = doc(collection(firestore, "Users"), userID);
            await updateDoc(userRef, {notificationSettings: notificationSetting});
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const blockUser = async (userID: any, blockedUserID: any) => {
        try {
            const userRef = doc(collection(firestore, "Users"), userID);
            await updateDoc(userRef, {blockedUsers: arrayUnion(blockedUserID)})

            user.value = {
                ...user.value,
                blockedUsers: [...user.value.blockedUsers, blockedUserID]
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const unblockUser = async (userID: any, unBlockedUserID: any) => {
        try {
            const userRef = doc(collection(firestore, "Users"), userID);
            await updateDoc(userRef, {blockedUsers: arrayRemove(unBlockedUserID)})

            user.value = {
                ...user.value,
                blockedUsers: user.value.blockedUsers.filter((i: any) => i !== unBlockedUserID)
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const updateLastSeenTime = async (userID: any) => {
        try {
            const userRef = doc(collection(firestore, "Users"), userID);

            const lastSeenTime = new Date();

            await updateDoc(userRef, {lastSeen: lastSeenTime});

            user.value = {
                ...user.value,
                lastSeen: lastSeenTime
            };
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const checkUserOnlineStatus = async (userID: any) => {
        const userRef = doc(collection(firestore, "Users"), userID);

        onSnapshot(userRef, snapshot => {
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

    const sendFriendRequest = async (senderID: any, receiverID: any) => {
        try {
            const friendRequestsCollection = collection(firestore, "FriendRequests");

            await addDoc(friendRequestsCollection, {
                senderID: senderID,
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
            await addFriendToFriendList(data?.senderID, data?.receiverID);
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

    const addFriendToFriendList = async (userID: any, friendID: any) => {
        try {
            const userRef = doc(collection(firestore, "Users"), userID);
            const userDoc = await getDoc(userRef);

            const friendRef = doc(collection(firestore, "Users"), friendID);
            const friendDoc = await getDoc(friendID);

            await updateDoc(userRef, {friendList: arrayUnion(friendDoc.data())});
            await updateDoc(friendRef, {friendList: arrayUnion(userDoc.data())});

            user.value = {
                ...user.value,
                friendList: [...user.value.friendList, friendDoc.data()]
            }
        } catch (error) {
            console.error("error: ", error);
        }
    };

    const getFriendList = async (userID: any) => {
        const friendList = ref<any>([]);

        const userRef = doc(collection(firestore, "Users"), userID);

        await getDoc(userRef).then((querySnapshot) => {
            friendList.value = querySnapshot.data()?.friendList || [];
        }, error => {
            console.log("error: ", error);
        })

        return friendList;
    };

    const getBlockedUsersList = async (userID: any) => {
        const blockedList = ref<any>([]);

        const userRef = doc(collection(firestore, "Users"), userID);

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
            data.value = querySnapshot.docs;
        }, (error) => {
            console.error("error: ", error);
        });
    };

    return {
        user,
        isLogin,
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
        getFriendList,
        getBlockedUsersList,
        searchUsersByKeyword
    }
};

export const useChat = () => {
    const {user, isLogin} = useAuth();

    const createChat = async (userID: any) => {
        const chat = ref<any>(null);
        const chatCollection = collection(firestore, "Chats");

        try {
            const chatRef = await addDoc(chatCollection, {
                participants: [],
                notificationSetting: true,
                Messages: [],
                userID: userID,
                photoURL: ""
            });

            getDoc(doc(chatCollection, chatRef.id)).then(r => {
                chat.value = r.data();
            });
        } catch (e) {
            console.log("error: ", e);
        }

        return chat;
    };

    const updateChat = async (chatID: any, participants: any) => {
        const chatsRef = doc(collection(firestore, "Chats"), chatID);

        try {
            await setDoc(chatsRef, {Participants: participants}, {merge: true});
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

    const getChatList = () => {
        const chats = ref<any>([]);
        const chatsRef = collection(firestore, "Chats");

        getDocs(chatsRef).then((querySnapshot) => {
            chats.value = querySnapshot.docs;
        }, error => {
            console.log("error: ", error);
        })
    };

    const getMessagesInChat = (chatID: any) => {
        const messages = ref<any>([]);
        const messagesRef = collection(doc(collection(firestore, "Chats"), chatID), "Messages");

        getDocs(messagesRef).then((querySnapshot) => {
            messages.value = querySnapshot.docs.reverse();
        }, (error) => {
            console.error("error: ", error);
        });

        return messages;
    };

    const sendMessage = async (chatID: any, content: any) => {
        if (!isLogin.value) return;

        const messagesRef = collection(doc(collection(firestore, "Chats"), chatID), "Messages");
        try {
            await addDoc(messagesRef, {
                senderID: user.userID,
                content: filter.clean(content),
                timestamp: serverTimestamp()
            });
        } catch (e) {
            console.error("error: ", e);
        }
    };

    return {createChat, updateChat, updateChatNotificationSettings, getMessagesInChat, sendMessage, getChatList}
};
