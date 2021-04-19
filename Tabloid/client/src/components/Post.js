import React from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Post = ({post}) => {
    
    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile)

    const history = useHistory()

    const editPost = () => {
      history.push(`/posts/edit/${post.id}`)
    }

    if (currentUser.id === post.userProfileId)
    {
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
      </Card>
    );
    
}

export default Post;