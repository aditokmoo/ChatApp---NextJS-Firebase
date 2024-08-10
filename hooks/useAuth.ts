import { auth, db } from "@/lib/firebase";
import upload from "@/lib/upload";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RegisterDataType {
    username: string,
    email: string,
    password: string,
    avatar: File[],
}

export default function useAuth() {
    const router = useRouter();
    const createAccount = async (data: RegisterDataType) => {
        const { username, email, password, avatar } = data;

        console.log(username, email, password)

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar);

            await setDoc(doc(db, "users", response.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: response.user.uid,
                blocked: [],
            });

            await setDoc(doc(db, "userChats", response.user.uid), {
                chats: [],
            })

            toast.success('Account has been created!');

            router.push('/dashboard');
        } catch (error) {
            if (error instanceof Error && error.message === 'Firebase: Error (auth/email-already-in-use).') {
                toast.error('Email already in use!');
            } else {
                toast.error(error instanceof Error && error.message);
            }
        }
    }

    return { createAccount }
}