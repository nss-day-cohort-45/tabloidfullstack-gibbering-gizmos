import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import { CommentContext } from '../../providers/CommentProvider';
import { useHistory, useParams } from "react-router-dom";

const CommentDelete = () => {

  const { id } = useParams();
  const [comment, setComment] = useState({});
  const history = useHistory();
  const { deleteComment, getCommentById, getAllCommentsOnPost } = useContext(CommentContext)

  // This is returning JSON
  const userProfile = sessionStorage.getItem("userProfile");
  // Parsing the JSON returned above into an object so we can use it
  var currentUser = JSON.parse(userProfile) //use this for admin check later

  useEffect(() => {
    getCommentById(id).then(setComment)
  }, [])

  const deleteIt = () => {
    deleteComment(id)
      .then(getAllCommentsOnPost())
      .then(history.push(`/comments/${id}`))
  }

  const cancelIt = () => {
    history.push(`/comments/${id}`)
  }


  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardHeader>
            <h2 className="text-left px-2">
              <strong>Are you sure you want to delete this?</strong>
            </h2>
          </CardHeader>
          <CardBody>
            <p>Comment: {comment.subject}</p>
          </CardBody>
          <CardFooter>
            <Button color="info" onClick={deleteIt}>Delete</Button>
            <Button color="info" onClick={cancelIt}>Cancel</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default CommentDelete;