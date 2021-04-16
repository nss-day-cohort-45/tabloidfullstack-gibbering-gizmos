import React, { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useHistory } from "react-router-dom";

export const PostForm = () => {
  const { addPost } = useContext(PostContext);
  const [userProfileId, setUserProfileId] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [publishDateTime, setPublishDateTime] = useState("");

  const history = useHistory();

  const submit = (e) => {
    const post = {
      imageLocation,
      title,
      content,
      category,
      publishDateTime,
      userProfileId: +userProfileId,
    };

    addPost(post).then((p) => {
      // Navigate the user back to the home route
      history.push("/");
    });
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" onChange={(e) => setTitle(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="imageLocation">Image Location</Label>
                <Input
                  id="imageLocation"
                  onChange={(e) => setImageLocation(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="content">Post Content</Label>
                <Input
                  id="content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="publishDateTime">Publish Date</Label>
                <Input
                  id="publishDateTime"
                  onChange={(e) => setPublishDateTime(e.target.value)}
                />
              </FormGroup>
            </Form>
            <Button color="info" onClick={submit}>
              SUBMIT
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PostForm;