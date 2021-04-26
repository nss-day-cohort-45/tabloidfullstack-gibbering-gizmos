import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { CommentContext } from '../../providers/CommentProvider';
import { useHistory, useParams } from "react-router-dom";


const CommentEdit = () => {

    const { updateComment, getCommentById, getAllComments, postId } = useContext(CommentContext)

    const { id } = useParams();
    const history = useHistory();
    const [comment, setComment] = useState({
        subject: "",
        content: ""
    });
    
    // form field states
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    const userProfile = sessionStorage.getItem("userProfile");




    useEffect(() => {
        getCommentById(id).then(setComment)
            // .then(getAllComments)
    }, []);

    // Once the comment has been set in state, update the form with previous post info
    useEffect(() => {

        setSubject(comment.subject)
        setContent(comment.content)
    }, [comment])


    const submit = (e) => {

        const updatedComment = {
            ...comment
        };
        console.log(comment.postId)
        updatedComment.subject = subject
        updatedComment.content = content

        updateComment(updatedComment).then((c) => {
            // Navigate the user back to the home route
            
            history.push(`/comments/${comment.postId}`);
            
        });
    }
    const cancel = () => {
        history.push(`/comments/${comment.postId}`);
    };

    if (comment === null) {
        return null
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Input type="text" id="subject" onChange={(e) => setSubject(e.target.value)} value={subject} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input type="textarea"
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                    rows="10"
                                />
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
                    </Button>
                        <Button color="info" onClick={cancel}>
                            CANCEL
                    </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default CommentEdit;
