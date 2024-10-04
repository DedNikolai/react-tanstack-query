
function Post({post}) {
    
    return (
        <div className="post">
            <h3>{post.title}</h3>
            <div>Views: {post.views}</div>
        </div>
    )   
};

export default Post;