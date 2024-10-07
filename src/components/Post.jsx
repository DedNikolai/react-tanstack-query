import { Link } from "react-router-dom";

function Post({post}) {
    
    return (
        <Link to={`/posts/${post.id}`}>
            <div className="post">
                <h3>{post.title}</h3>
                <div>Views: {post.views}</div>
            </div>
        </Link>

    )   
};

export default Post;