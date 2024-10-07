import {useEffect} from 'react';
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useUpdatePost } from "../hooks/useUpdatePost";

function ReadPostPage() {
    const {postId} = useParams();
    const {data, isPending} = usePost({postId});
    const mutate = useUpdatePost({postId});
    console.log(isPending)
    useEffect(() => {
        if (!isPending) {
            const updatedPost = {title: data.title, views: data.views + 1}
             mutate({updatedPost, postId});
        }
        
    }, [isPending])

    if (isPending) return <h2>Loading....</h2>

    return (
        <>
        <h1>Post {data.id}</h1>
        <h2>{data.title}</h2>
        <h3>{data.views}</h3>
        </>
    )
}

export default ReadPostPage;