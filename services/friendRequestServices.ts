import { db } from "@/lib/firebase";
import { fetchFirebaseDoc, removeFriendRequest } from "@/lib/firestoreHelpers";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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

export async function acceptFriendRequest(currentUser: any, user: any) {
    console.log(currentUser)
    console.log(user)
    // Get document references
    const currentUserRef = doc(db, 'users', currentUser?.id);
    const recipientUserRef = doc(db, 'users', user?.id);
    const currentUserFriendRequestRef = doc(db, 'friendRequests', currentUser?.id);
    const recipientUserFriendRequestRef = doc(db, 'friendRequests', user?.id);

    try {
        // Fetch data for both users
        const [currentUserData, recipientUserData] = await Promise.all([
            fetchFirebaseDoc(currentUserFriendRequestRef),
            fetchFirebaseDoc(recipientUserFriendRequestRef),
        ]);

        const receivedRequestToRemove = currentUserData?.receivedRequests?.find(req => req.id === user.id);
        const sentRequestToRemove = recipientUserData?.sentRequests?.find(req => req.id === currentUser.id);

        // Remove from sentRequests and receivedRequests
        await Promise.all([
            removeFriendRequest(currentUserFriendRequestRef, 'receivedRequests', receivedRequestToRemove),
            removeFriendRequest(recipientUserFriendRequestRef, 'sentRequests', sentRequestToRemove),
        ]);


        // Add each user to the other's friends array
        const currentUserFriendData = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        };

        const recipientUserFriendData = {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            avatar: currentUser.avatar,
        };

        await Promise.all([
            updateDoc(currentUserRef, {
                friends: arrayUnion(currentUserFriendData),
            }),
            updateDoc(recipientUserRef, {
                friends: arrayUnion(recipientUserFriendData),
            }),
        ]);

        return {
            currentUserFriends: (await fetchFirebaseDoc(currentUserRef))?.friends || [],
            recipientUserFriends: (await fetchFirebaseDoc(recipientUserRef))?.friends || [],
        };
    } catch (error) {
        console.log("Error accepting friend request", error);
        throw error;
    }
}

export async function cancelFriendRequest(currentUser, user) {
    const currentUserRef = doc(db, 'friendRequests', currentUser?.id);
    const recipientUserRef = doc(db, 'friendRequests', user?.id);

    try {
        const [currentUserData, recipientUserData] = await Promise.all([
            fetchFirebaseDoc(currentUserRef),
            fetchFirebaseDoc(recipientUserRef),
        ]);

        const sentRequestToRemove = currentUserData?.sentRequests?.find(req => req.id === user.id);
        const receivedRequestToRemove = recipientUserData?.receivedRequests?.find(req => req.id === currentUser.id);

        await Promise.all([
            removeFriendRequest(currentUserRef, 'sentRequests', sentRequestToRemove),
            removeFriendRequest(recipientUserRef, 'receivedRequests', receivedRequestToRemove),
        ]);

        return {
            sentRequests: (await fetchFirebaseDoc(currentUserRef))?.sentRequests || [],
            receivedRequests: (await fetchFirebaseDoc(recipientUserRef))?.receivedRequests || [],
        };
    } catch (error) {
        console.error("Error canceling friend request:", error);
        throw error;
    }
}

export async function declineFriendRequest(currentUser, user) {
    const currentUserRef = doc(db, 'friendRequests', currentUser?.id);
    const recipientUserRef = doc(db, 'friendRequests', user?.id);

    try {
        const [currentUserData, recipientUserData] = await Promise.all([
            fetchFirebaseDoc(currentUserRef),
            fetchFirebaseDoc(recipientUserRef),
        ]);

        const receivedRequestToRemove = currentUserData?.receivedRequests?.find(req => req.id === user.id);
        const sentRequestToRemove = recipientUserData?.sentRequests?.find(req => req.id === currentUser.id);

        await Promise.all([
            removeFriendRequest(currentUserRef, 'receivedRequests', receivedRequestToRemove),
            removeFriendRequest(recipientUserRef, 'sentRequests', sentRequestToRemove),
        ]);

        return {
            sentRequests: (await fetchFirebaseDoc(currentUserRef))?.sentRequests || [],
            receivedRequests: (await fetchFirebaseDoc(recipientUserRef))?.receivedRequests || [],
        };
    } catch (error) {
        console.error("Error declining friend request:", error);
        throw error;
    }
}