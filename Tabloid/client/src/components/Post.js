import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({post}) => {
    
    return (
        <Card className="m-4">
          <CardHeader>
            <h2 className="text-left px-2"> 
                {/* The route to post details is here */}
                <Link to={`/posts/${post.id}`}>
                  <strong> {post.title}</strong>
                </Link>
            </h2>
          </CardHeader>
          <CardBody>
            <p>Author: {post.userProfile.displayName}</p>
            <p>Category: {post.category.name}</p>
          </CardBody>
          <CardFooter>
            <Button>Edit</Button>
            <Button color="danger">Delete</Button>
          </CardFooter>
        </Card>
      );
}

export default Post;