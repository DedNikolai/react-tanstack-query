
import {useEffect} from "react";
import { useQuery } from "@tanstack/react-query"
import axios from 'axios';

const getTodos = async () => {
    const response = axios.get('http://localhost:3000/posts');
    return response;
  }

export function usePosts(isEnabled) {
    const {data = [], isError, isLoading, isSuccess} = useQuery({ 
        queryKey: ['posts'], 
        queryFn: getTodos,
        select: (data) => data.data,
        enabled: isEnabled
    })

    useEffect(() => {
        if(isSuccess) {
          console.log("Data loaded success")
        }
        if (isError) {
          console.log('Error')
        }
    }, [isSuccess, isError])

    return {data, isError, isLoading, isSuccess}
};

