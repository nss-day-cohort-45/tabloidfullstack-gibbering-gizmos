import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    CardSubtitle,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";

const Post = ({ post }) => {
    const { deletePost, getAllPosts } = useContext(PostContext);

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile);

    const history = useHistory();

    const editPost = () => {
        history.push(`/posts/edit/${post.id}`);
    };

    const handleDeletePost = (postName) => {
        if (window.confirm(`Are you sure you want to delete ${postName}?`)) {
            deletePost(post.id).then(getAllPosts);
            history.push("/posts");
        }
    };

    if (currentUser.id === post.userProfileId) {
        return (
            <Card className="m-4">
                <CardBody>
                    <Link className="postLink" to={`/posts/${post.id}`}>
                        <CardTitle tag="h2">
                            {/* The route to post details is here */}
                            <strong> {post.title}</strong>
                        </CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                            Author: {post.userProfile.displayName}
                        </CardSubtitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                            Category: {post.category.name}
                        </CardSubtitle>
                    </Link>
                    <div style={{ float: "right" }}>
                        <Button onClick={editPost}>Edit</Button>
                        <Button
                            color="danger"
                            onClick={() => handleDeletePost(post.title)}
                        >
                            Delete
                        </Button>
                    </div>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card className="m-4">
            <Link className="postLink" to={`/posts/${post.id}`}>
                <CardBody>
                    <CardTitle tag="h2">
                        {/* The route to post details is here */}
                        <strong> {post.title}</strong>
                    </CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Author: {post.userProfile.displayName}
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Category: {post.category.name}
                    </CardSubtitle>
                </CardBody>
            </Link>
        </Card>
    );
};

export default Post;
