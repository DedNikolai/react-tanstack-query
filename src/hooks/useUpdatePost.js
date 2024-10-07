
import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from 'axios';

const updatePost = async ({updatedPost, postId}) => {
    console.log(updatedPost, postId)
    const response = axios.put(`http://localhost:3000/posts/${postId}`, updatedPost);
    return response;
  }

export function useUpdatePost(postId) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['update post'],
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['post', postId]})            
        },
        onError: (errors) => console.log(errors)

    });

    const {mutate} = mutation;
    return mutate;
};
