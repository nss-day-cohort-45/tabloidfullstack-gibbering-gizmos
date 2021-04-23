import React, { useContext, useEffect, useState } from "react"
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  CardHeader
} from "reactstrap";
import { CommentContext } from '../../providers/CommentProvider';
import { useHistory, useParams } from 'react-router-dom';

export const CommentForm = () => {
  const { addComment, getCommentsByPostId, postId } = useContext(CommentContext)
  const history = useHistory();

  const [comment, setComment] = useState({
    subject: "",
    content: ""
  })

  const handleControlledInputChange = (event) => {
    const newComment = { ...comment }

    newComment[event.target.id] = event.target.value
    setComment(newComment)
  }

  const saveComment = ()  => {

    addComment({
    subject: comment.subject,
    content: comment.content,
    createDateTime: Date.now,
    userProfileId: 1,
    postId: postId
    })
    .then(setComment)
    .then(history.push(`/comments/${postId}`))
  }

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardHeader>
            <h2 className="commentForm__title">Add comment</h2>
          </CardHeader>
          <CardBody>
            <Form className="commentForm">
              <FormGroup>
                <Label for="subject">Subject: </Label>
                <Input type="text" id="subject" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Subject" value={comment.subject} />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content: </Label>
                <Input type="textarea" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control"
                placeholder="Enter your comment here" value={comment.content} rows="10" />
              </FormGroup>
            </Form>
            <Button color="info" onClick={saveComment}>Save comment</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default CommentForm
