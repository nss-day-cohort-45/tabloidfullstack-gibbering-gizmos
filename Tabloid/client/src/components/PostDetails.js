import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import { PostContext } from "../providers/PostProvider"
import Post from "./Post"
import { useHistory, Link, useParams } from "react-router-dom";

// Title
// Header image (if exists)
// Content
// Publication date (MM/DD/YYYY)
// Author's Display Name
const PostDetails = () => {
    const { getPostById } = useContext(PostContext);
    const [ post, setPost ] = useState();
    const {id} = useParams();
    const history = useHistory();

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile)

    useEffect(() => {
        getPostById(id)
        .then(setPost)
        
    }, []);

    useEffect(() => {
        console.log(post, "This is a post")
    }, [post])

    const editPost = () => {
        history.push(`/posts/edit/${post.id}`)
      }
       
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
                </CardHeader>
                <CardBody>
                    <img src={post.imageLocation} alt="header"/>
                    <p>{post.content}</p>
                </CardBody>
                <CardFooter>   
                <Button onClick={editPost}>Edit</Button>
                <Button color="danger">Delete</Button>
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
            </CardHeader>
            <CardBody>
                <img src={post.imageLocation} alt="header"/>
                <p>{post.content}</p>
            </CardBody>
        </Card>
    );
};

export default PostDetails;