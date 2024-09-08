import { auth, db } from "@/lib/firebase";
import upload from "@/lib/upload";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface RegisterDataType {
    username: string,
    email: string,
    password: string,
    avatar: File[],
}

interface LoginDataType {
    email: string,
    password: string
}

export async function createAccount(registerData: RegisterDataType) {
    const { username, email, password, avatar } = registerData;

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);

        const imgUrl = await upload(avatar, (progress) => {
            return progress
        });

        console.log(imgUrl)

        await setDoc(doc(db, "users", response.user.uid), {
            username,
            email,
            avatar: imgUrl,
            id: response.user.uid,
            friends: [],
            blocked: [],
        });

        await setDoc(doc(db, "userChats", response.user.uid), {
            chats: [],
        });

        return response;
    } catch (error) {
        console.error("Error when creating account: ", error);
        throw error;
    }
}

export async function login(loginData: LoginDataType) {
    const { email, password } = loginData;

    try {
        const response = await signInWithEmailAndPassword(auth, email, password);

        return response;
    } catch (error) {
        console.error("Auth error: ", error);
        throw error;
    }
}