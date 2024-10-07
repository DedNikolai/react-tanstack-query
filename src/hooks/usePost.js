
import {useEffect} from "react";
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';

const getPost = async (postId) => {
    const response = axios.get(`http://localhost:3000/posts/${postId}`);
    return response;
  }

export function usePost({postId}) {
    const {data = [], isError, isLoading, isSuccess, isPending, refetch} = useQuery({ 
        queryKey: ['post', postId], 
        queryFn: () => getPost(postId),
        select: (data) => data.data,
        enabled: !!postId
    })

    useEffect(() => {
        if(isSuccess) {
          console.log("Post loaded success")
        }
        if (isError) {
          console.log('Error')
        }
    }, [isSuccess, isError])

    return {data, isError, isLoading, isSuccess, isPending}
};
