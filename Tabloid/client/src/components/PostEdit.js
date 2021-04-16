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
    const {updatePost} = useContext(PostContext)

    const history = useHistory();

    useEffect(() => {
        //getPostById goes here .then(setPost)
    }, []);

    
}