import { startChat } from "@/services/chatServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useStartChat() {
    const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
        mutationKey: ['startChat'],
        mutationFn: ({ currentUser, user }) => startChat(currentUser, user),
        onSuccess: (result) => {
            console.log("Chat started successfully:", result);
        },
        onError: (error) => {
            toast.error("Something went wrong!");
            console.log(error)
        }
    });

    return { mutate, isPending, isError, isSuccess, data, error };
}