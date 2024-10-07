import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useUpdatePost } from "../hooks/useUpdatePost";

function PostPage() {
    const {postId} = useParams();
    const {data, isPending} = usePost({postId});
    const mutate = useUpdatePost({postId});

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
      } = useForm({
        criteriaMode: "all",
        defaultValues: {...data}
        // mode: 'onBlur'
      })

    const onSubmit = (post) => {
       const updatedPost = {...post, views: 0}
       mutate({updatedPost, postId});
    }  

    if (isPending) return <h2>Loading....</h2>

    return (
        <>
        <h1>Post {data.id}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Title
                <input
                    {...register("title", 
                    { 
                        required: '"This is required."', 
                        maxLength: {
                            value: 20,
                            message: "This input is to long",
                        }, 
                        minLength: {
                            value: 3,
                            message: "This input to short.",
                        }
                    })}
                    defaultValue={data.title}
                />
            </label>  
            <ErrorMessage
                errors={errors}
                name="title"
                render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                ))
                }
            />

            <div><input disabled={!isValid} type="submit" /></div>
        </form>
        <h3>{data.views}</h3>
        </>
    )
}

export default PostPage;