import { db } from "@/lib/firebase";
import { arrayRemove, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

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

export async function fetchFriendRequests(currentUser) {
    if (!currentUser) return;

    try {
        const userDoc = doc(db, "friendRequests", currentUser.id);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            return { sentRequests: [], receivedRequests: [] };
        }
    } catch (error) {
        console.error("Error fetching friend requests: ", error);
        throw new Error("Failed to fetch friend requests");
    }
}

export async function sendFriendRequest(currentUser: any, user: any) {
    const currentUserRef = doc(db, 'friendRequests', currentUser.id);
    const recipientUserRef = doc(db, 'friendRequests', user.id);

    try {
        // Ensure current user's friendRequests document exists
        const currentUserDoc = await getDoc(currentUserRef);
        if (!currentUserDoc.exists()) {
            await setDoc(currentUserRef, {
                sentRequests: [],
                receivedRequests: [],
            });
        }

        // Ensure recipient user's friendRequests document exists
        const recipientUserDoc = await getDoc(recipientUserRef);
        if (!recipientUserDoc.exists()) {
            await setDoc(recipientUserRef, {
                sentRequests: [],
                receivedRequests: [],
            });
        }

        // Fetch additional user data from users collection
        const currentUserData = (await getDoc(doc(db, 'users', currentUser.id))).data();
        const recipientUserData = (await getDoc(doc(db, 'users', user.id))).data();

        // Create objects to store in sentRequests and receivedRequests
        const currentUserRequestData = {
            id: currentUser.id,
            username: currentUserData?.username,
            email: currentUserData?.email,
            avatar: currentUserData?.avatar,
        };

        const recipientUserRequestData = {
            id: user.id,
            username: recipientUserData?.username,
            email: recipientUserData?.email,
            avatar: recipientUserData?.avatar,
        };

        // Add to the current user's sent requests
        await updateDoc(currentUserRef, {
            sentRequests: arrayUnion(recipientUserRequestData),
        });

        // Add to the recipient user's received requests
        await updateDoc(recipientUserRef, {
            receivedRequests: arrayUnion(currentUserRequestData),
        });

        // Fetch and return the updated documents
        const updatedCurrentUserDoc = await getDoc(currentUserRef);
        const updatedRecipientUserDoc = await getDoc(recipientUserRef);

        return {
            sentRequests: updatedCurrentUserDoc.data()?.sentRequests || [],
            receivedRequests: updatedRecipientUserDoc.data()?.receivedRequests || [],
        };
    } catch (error) {
        console.error("Error sending friend request:", error);
        throw error;
    }
}

export async function cancelFriendRequest(currentUser: any, user: any) {
    const currentUserRef = doc(db, 'friendRequests', currentUser?.id);
    const recipientUserRef = doc(db, 'friendRequests', user?.id);

    try {
        // Fetch the current state of the documents
        const currentUserDoc = await getDoc(currentUserRef);
        const recipientUserDoc = await getDoc(recipientUserRef);

        const currentUserData = currentUserDoc.data();
        const recipientUserData = recipientUserDoc.data();

        // Find the request objects to remove
        const sentRequestToRemove = currentUserData?.sentRequests?.find(
            (req: any) => req.id === user.id
        );

        const receivedRequestToRemove = recipientUserData?.receivedRequests?.find(
            (req: any) => req.id === currentUser.id
        );

        // Update the current user's sent requests by removing the recipient's request
        if (sentRequestToRemove) {
            await updateDoc(currentUserRef, {
                sentRequests: arrayRemove(sentRequestToRemove),
            });
        }

        // Update the recipient user's received requests by removing the current user's request
        if (receivedRequestToRemove) {
            await updateDoc(recipientUserRef, {
                receivedRequests: arrayRemove(receivedRequestToRemove),
            });
        }

        // Fetch and return the updated documents
        const updatedCurrentUserDoc = await getDoc(currentUserRef);
        const updatedRecipientUserDoc = await getDoc(recipientUserRef);

        return {
            sentRequests: updatedCurrentUserDoc.data()?.sentRequests || [],
            receivedRequests: updatedRecipientUserDoc.data()?.receivedRequests || [],
        };
    } catch (error) {
        console.error("Error canceling friend request:", error);
        throw error;
    }
}