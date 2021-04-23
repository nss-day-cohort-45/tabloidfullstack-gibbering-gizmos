import React from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

const Comment = ({comment}) => {
  const history = useHistory();

  return (
    <Card className="m-4">
      <CardBody>
        <p>{comment.subject}</p>
        <p>{comment.content}</p>
        <p>{comment.userProfile.displayName}</p>
        <p>{new Date(comment.createDateTime).toLocaleString("en-US").split(', ')[0]}</p>
      </CardBody>  
    </Card>
  );
}

export default Comment;
