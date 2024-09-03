import { db } from "@/lib/firebase";
import { arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export async function startChat(currentUser: any, user: any) {
    console.log(currentUser)
    console.log(user)
    try {
        const chatRef = collection(db, 'chats');
        const userChatsRef = collection(db, 'userChats');

        const chatId = currentUser?.id < user?.id
            ? `${currentUser?.id}_${user?.id}`
            : `${user?.id}_${currentUser?.id}`;

        const chatDocRef = doc(chatRef, chatId);
        const existingChatDoc = await getDoc(chatDocRef);

        if (existingChatDoc.exists()) {
            return { exists: true, chatId };
        } else {
            await setDoc(chatDocRef, {
                createdAt: serverTimestamp(),
                messages: []
            });

            // Ensure user documents exist before updating
            const userDocRef1 = doc(userChatsRef, user?.id);
            const userDocRef2 = doc(userChatsRef, currentUser?.id);

            // Create user documents if they don't exist
            await setDoc(userDocRef1, { chats: [] }, { merge: true });
            await setDoc(userDocRef2, { chats: [] }, { merge: true });

            // Update user data
            await updateDoc(userDocRef1, {
                chats: arrayUnion({
                    chatId,
                    lastMessage: '',
                    receiverId: currentUser?.id,
                    updatedAt: Date.now()
                })
            });

            await updateDoc(userDocRef2, {
                chats: arrayUnion({
                    chatId,
                    lastMessage: '',
                    receiverId: user?.id,
                    updatedAt: Date.now()
                })
            });

            return { exists: false, chatId };
        }
    } catch (error) {
        console.error("Error starting chat:", error);
        throw error;
    }
}