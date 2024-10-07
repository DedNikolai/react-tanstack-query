import Post from '../components/Post';
import { usePosts } from '../hooks/usePosts'; 
import CreatePost from '../components/CreatePost';

const isAuth = true;

function Home() {
    const {data, isLoading} = usePosts(isAuth)


    if (isLoading) return <h3>Loading.....</h3>

    return (
        <>
        <h3>React Query Home</h3>
        <CreatePost />
        {
          data.map(post => <Post post={post} key={post.id}/>)
        }
      </>
    )
}

export default Home;