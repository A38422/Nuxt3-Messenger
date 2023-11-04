export const useUtils = () => {
    const checkExistChat = (userID: any, friendID: any) : [any, any] => {
        const chatStore = useChatStore();
        const chats = computed(() => chatStore.$state.chats);

        let temp = null;
        let checkUserID = false;
        let checkFriendID = false;

        for (const chat of chats.value) {
            // @ts-ignore
            if (chat.participants[0].userID === userID || chat.participants[1].userID === userID) checkUserID = true;
            // @ts-ignore
            if (chat.participants[0].userID === friendID || chat.participants[1].userID === friendID) checkFriendID = true;

            if (checkFriendID && checkUserID) {
                temp = chat;
                break;
            }
        }

        return [checkUserID && checkFriendID, temp];
    };

    return {
        checkExistChat
    };
}