import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({post}) => {
    
    return (
        <Card className="m-4">
          <p className="text-left px-2">Title: 
              {/* The route to post details is here */}
              <Link to={`/posts/${post.id}`}>
                <strong> {post.title}</strong>
              </Link>
          </p>
          <CardBody>
            <p>Author: {post.userProfile.name}</p>
            <p>Category: {post.category.name}</p>
          </CardBody>
        </Card>
      );
}

export default Post;