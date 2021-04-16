import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
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

    useEffect(() => {
        getPostById(id)
        .then(setPost)
        
    }, []);

    useEffect(() => {
        console.log(post, "This is a post")
    }, [post])
       
    if ( !post ) {
        return null;
    };
    return ( 
        
        <Card className="m-4">
            <p className="text-left px-2">Title:
                <strong> {post.title}</strong>
            </p>
                <div>{post.imageLocation}</div>
            <CardBody>
                <p>Publication Date: {post.publishDateTime}</p>
                <p>Author: {post.userProfile.displayName}</p>
                <p>Content: {post.content}</p>
            </CardBody>
        </Card>
    );
};

export default PostDetails;