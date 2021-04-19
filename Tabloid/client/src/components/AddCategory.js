import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../providers/PostProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const CategoryForm = () => {
    const { addCategory } = useContext(CategoryContext);
    const [name, setname] = useState('');

    const history = useHistory();

    const handleClickSaveButton = (evt) => {
        const category = {
            imageUrl,
            title,
            caption,
            userProfileId: +userProfileId,
        };
        addPost(post).then((p) => {
            history.push('/');
        });
    };

    return (
        <Form className="container col-md-6">
            <h2>New Post</h2>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Post Title"
                    autoComplete="off"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="imageUrl">Image URL</Label>
                <Input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    placeholder="Image URL"
                    autoComplete="off"
                    onChange={(e) => {
                        setImageUrl(e.target.value);
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label for="caption">Caption</Label>
                <Input
                    type="text"
                    name="caption"
                    id="caption"
                    placeholder="Caption"
                    autoComplete="off"
                    onChange={(e) => {
                        setCaption(e.target.value);
                    }}
                />
            </FormGroup>
            <Button onClick={handleClickSaveButton}>Submit</Button>
        </Form>
    );
};

export default PostForm;