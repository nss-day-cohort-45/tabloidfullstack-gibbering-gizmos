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
import { PostContext } from "../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostEdit = () => {
    
    const {updatePost, getPostById} = useContext(PostContext) // Grabbing PostContext to gain access to the updatePost and getPostById methods
    const { id } = useParams(); // Grabbing the ID with params
    const [post, setPost] = useState({}); // Local state used to set the post object so it can be manipulated
    const history = useHistory(); // Use history to push the user to a different view

    // form field states
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageLocation, setImageLocation] = useState("");
    const [category, setCategory] = useState("");
    const [publishedDate, setPublishedDate] = useState("");

    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile)

    // Onload useEffect to grab the proper post to edit by ID
    useEffect(() => {
        getPostById(id).then(setPost)
    }, []);

    // Once the post has been set in state, update the form with previous post info
    useEffect(() => {
        setTitle(post.title)
        setContent(post.content)
        setImageLocation(post.imageLocation)
        setCategory(post.categoryId)
        setPublishedDate(post.publishedDate)
    }, [post])

    // Submit button functionality for the form
    const submit = (e) => {
        
        // Creating new post object
        const updatedPost = {
          ...post
        };
        
        // Adding the key/value pairs to the new post object
        updatedPost.title = title
        updatedPost.imageUrl = imageLocation
        updatedPost.content = content
        updatePost.category = category
        updatedPost.publishedDate = publishedDate
        
        // Update the database with the new post
        updatePost(updatedPost).then((p) => {
          // Navigate the user back to the home route
          history.push(`/posts/${id}`);
        });
      };

      // Check if post is null and make sure current user owns the post
      if(post === null || currentUser.id !== post.userProfileId)
      {
          return null
      }
    
    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                <CardBody>
                    <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input id="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input
                        id="content"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageLocation">Image Location</Label>
                        <Input
                        id="imageLocation"
                        onChange={(e) => setImageLocation(e.target.value)}
                        value={imageLocation}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input
                        id="category"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
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
    )
}

export default PostEdit;