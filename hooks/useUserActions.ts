import { acceptFriendRequest, cancelFriendRequest, declineFriendRequest, fetchFriendRequests, sendFriendRequest, startChat } from "@/services/userActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useFriendRequestAction(actionType, currentUser) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: [actionType],
        mutationFn: ({ currentUser, user }) => {
            if(actionType === 'send') return sendFriendRequest(currentUser, user);
            if(actionType === 'cancel') return cancelFriendRequest(currentUser, user);
            if(actionType === 'decline') return declineFriendRequest(currentUser, user);
            if(actionType === 'accept') return acceptFriendRequest(currentUser, user);
        },
        onSuccess: (result) => {
            console.log(`${actionType} friend request succesfully: `, result);
            queryClient.invalidateQueries(['friendRequests', currentUser?.id])
        },
        onError: (error) => {
            toast.error('Something went wrong');
            console.log(error)
        }
    })

    return { mutate, isPending }
}

export function useGetFriendRequests(currentUser) {
    const { data, isLoading } = useQuery({
        queryKey: ['friendRequests', currentUser.id],
        queryFn: () => fetchFriendRequests(currentUser),
        enabled: !!currentUser,
        staleTime: 1000 * 60 * 5,
    });

    return { data, isLoading }
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