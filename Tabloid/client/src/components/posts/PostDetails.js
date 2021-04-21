import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import { PostContext } from '../../providers/PostProvider';
import { useHistory, useParams } from "react-router-dom";
import { PostTagContext } from "../../providers/PostTagProvider";


const PostDetails = () => {
    const { getPostById, deletePost } = useContext(PostContext);
    const [ post, setPost ] = useState();
    const {id} = useParams();
    const history = useHistory();
    const { getTagsByPostId } = useContext(PostTagContext);
    const [ postTags, setPostTags ] = useState([]);

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile)

    useEffect(() => {
        getPostById(id)
        .then(setPost)
        
    }, []);
    
    useEffect(() =>{
        getTagsByPostId(id).then(setPostTags)
    }, [post])
    
    useEffect(() => {
        console.log(post, "This is a post")
    }, [post])

    const editPost = () => {
        history.push(`/posts/edit/${post.id}`)
      }

    const tagList = () => {
        history.push(`/tagManager/${post.id}`)
    }  
       

    const handleDeletePost = (postName) => {
        if (window.confirm(`Are you sure you want to delete ${postName}?`)) {
            deletePost(post.id).then(getPostById);
            history.push("/posts");
        }
    };

    if ( !post ) {
        return null;
    };

    if(currentUser.id === post.userProfileId)
    {
        return ( 
        
            <Card className="m-4">
                <CardHeader>
                    <h2 className="text-left px-2">
                        <strong>{post.title}</strong>
                    </h2>
                    <p><b>Author:</b> {post.userProfile.displayName} | <b>Category:</b> {post.category.name} | <b>Published:</b> {post.publishDateTime}</p>
                    <p>Tags: {postTags.map(pt => pt.name)}</p>
                </CardHeader>
                <CardBody>
                    <img src={post.imageLocation} alt="header"/>
                    <p>{post.content}</p>
                </CardBody>
                <CardFooter>   
                <Button onClick={editPost}>Edit</Button>
                <Button onClick={tagList}>Manage Tags</Button>
                <Button color="danger" onClick={() => handleDeletePost(post.title)}>
                        Delete
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return ( 
        
        <Card className="m-4">
            <CardHeader>
                <h2 className="text-left px-2">
                    <strong>{post.title}</strong>
                </h2>
                <p><b>Author:</b> {post.userProfile.displayName} | <b>Category:</b> {post.category.name} | <b>Published:</b> {post.publishDateTime}</p>
                <p>Tags: {postTags.map(pt => pt.name)}</p>
            </CardHeader>
            <CardBody>
                <img src={post.imageLocation} alt="header"/>
                <p>{post.content}</p>
            </CardBody>
        </Card>
    );
};

export default PostDetails;