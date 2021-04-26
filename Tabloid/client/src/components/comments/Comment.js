import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";


const Comment = ({ comment }) => {
  const history = useHistory();
  const userProfile = sessionStorage.getItem("userProfile");
  var currentUser = JSON.parse(userProfile);
  


  const editComment = () => {
    
    history.push(`/comment/edit/${comment.id}`);
  };

  if (currentUser.id === comment.userProfileId) {

    return (
      <Card className="m-4">
        <CardBody>
          <p>{comment.subject}</p>
          <p>{comment.content}</p>
          <p>{comment.userProfile.displayName}</p>
          <p>{new Date(comment.createDateTime).toLocaleString("en-US").split(', ')[0]}</p>
        </CardBody>
        <Button onClick={editComment}>Edit</Button>
      </Card>
    )
  } else {
    return (

      <Card className="m-4">
        <CardBody>
          <p>{comment.subject}</p>
          <p>{comment.content}</p>
          <p>{comment.userProfile.displayName}</p>
          <p>{new Date(comment.createDateTime).toLocaleString("en-US").split(', ')[0]}</p>
        </CardBody>
      </Card>
    )

  }
}

export default Comment;
