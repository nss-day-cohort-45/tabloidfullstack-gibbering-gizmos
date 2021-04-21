import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button, CardImg } from "reactstrap";
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

    const FormattedContent = () => {
        const paragraphs = post.content.split('\n')
        let i = 0
        return (
            <div>
            {paragraphs.map((p) => (
                <p key={++i}>{p}</p>
            ))}
            </div>
        )
    }

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
            <div className="container">
                <Card className="m-4">
                    <CardHeader>
                        <h2>
                            <strong>{post.title}</strong>
                        </h2>
                        <h6><b>Author:</b> {post.userProfile.displayName} | <b>Category:</b> {post.category.name} | <b>Published:</b> {new Date(post.publishDateTime).toLocaleString("en-US").split(', ')[0]}</h6>
                        
                        <p>Tags: {postTags.map(pt => pt.name)}</p>
                    </CardHeader>
                    <CardBody>
                        <CardImg src={post.imageLocation} alt="header"/>
                        <FormattedContent />
                    </CardBody>
                    <CardFooter className="text-right">   
                    <Button onClick={editPost}>Edit</Button>
                    <Button onClick={tagList}>Manage Tags</Button>
                    <Button color="danger" onClick={() => handleDeletePost(post.title)}>
                            Delete
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return ( 
        <div className="container">
            <Card className="m-4">
                <CardHeader>
                    <h2>
                        <strong>{post.title}</strong>
                    </h2>

                    <h6><b>Author:</b> {post.userProfile.displayName} | <b>Category:</b> {post.category.name} | <b>Published:</b> {new Date(post.publishDateTime).toLocaleString("en-US").split(', ')[0]}</h6>

                    <p>Tags: {postTags.map(pt => pt.name)}</p>
                </CardHeader>
                <CardBody>
                    <CardImg src={post.imageLocation} alt="header"/>
                    <FormattedContent />
                </CardBody>
            </Card>
        </div>
    );
};

export default PostDetails;