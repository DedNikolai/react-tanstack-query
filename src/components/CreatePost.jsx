import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createPost = (post) => {
  return axios.post('http://localhost:3000/posts', post)
} 

function CreatePost() {
    const queryClient = useQueryClient()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
      } = useForm({
        criteriaMode: "all",
        // mode: 'onBlur'
      })

      const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        onError: (errors) => console.log(errors)
      })
    

      const onSubmit = (data) => {
        mutation.mutate(data)
        reset()
      }

    return (
        <>
        <h3>Create Post</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Titlr
                <input
                    {...register("title", 
                    { 
                        required: '"This is required."', 
                        maxLength: {
                            value: 10,
                            message: "This input is to long",
                        }, 
                        minLength: {
                            value: 3,
                            message: "This input to short.",
                        }
                    })}
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
        </>
    )
};

export default CreatePost;