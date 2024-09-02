import { getDoc, updateDoc, arrayRemove } from "firebase/firestore";

export async function fetchFirebaseDoc(userRef) {
    const userDoc = await getDoc(userRef);
    return userDoc.data();
}

export async function removeFriendRequest(docRef, field, request) {
    if (request) {
        await updateDoc(docRef, {
            [field]: arrayRemove(request),
        });
    }
}