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
  const { addComment, getCommentsByPostId } = useContext(CommentContext)
  const history = useHistory();
  const { id } = useParams()

  const [comment, setComment] = useState({
    subject: "",
    content: ""
  })

  const [commentObj, setCommentObj] = useState({})

  const handleControlledInputChange = (event) => {
    const newComment = { ...comment }

    newComment[event.target.id] = event.target.value
    setComment(newComment)
  }

  const saveComment = ()  => {

    const subject = comment.subject
    const content = comment.content

    addComment({
    subject: comment.subject,
    content: comment.content,
    createDateTime: Date.now,
    postId = id
    })
    .then(setComment)
    .then(getCommentsByPostId)
  }

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          
        </Card>
      </div>
    </div>
  )
}
