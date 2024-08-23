import { fetchFriendRequests, sendFriendRequest, startChat } from "@/services/userActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useSendFriendRequest(currentUser) {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['friendRequests'],
        queryFn: () => fetchFriendRequests(currentUser),
        enabled: !!currentUser,
        staleTime: 1000 * 60 * 5,
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['sendFriendRequest'],
        mutationFn: ({ currentUser, user }) => sendFriendRequest(currentUser, user),
        onSuccess: (result) => {
            console.log("Friend request sent successfully:", result);
            // Invalidate the friendRequests query to refetch the data
            queryClient.invalidateQueries(['friendRequests', currentUser?.id]);
        },
        onError: (error) => {
            toast.error("Something went wrong!");
            console.log(error)
        }
    });

    return { mutate, isPending, data, isLoading };
}

export function useCancelFriendRequest(currentUser: any, user: any) {

}

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