import { PostTagContext } from "../../providers/PostTagProvider";
import { TagContext } from "../../providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react"
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    CardFooter
} from "reactstrap";


const PostTagList = () => {
    const { tags, getAllTags, setTags } = useContext(TagContext);
    const { addPostTag, setPostTags, getTagsByPostId, deletePostTag } = useContext(PostTagContext);
    const { id } = useParams();
    const history = useHistory();
    const [postTag, setPostTag] = useState("");
    const [listOfTags, setListOfTags] = useState([]);
    const [chosenTag, setChosenTag] = useState({});

    useEffect(() => {
        getAllTags().then(setTags);
    }, []);

    useEffect(() => {
        getTagsByPostId(id).then(setListOfTags)
    }, [])

    const handleSavePostTagButton = () => {
        const newPostTag = {
            ...postTag
        };
        newPostTag.tagId = postTag
        newPostTag.postId = id

        addPostTag(newPostTag)
            .then(history.push(`/posts/${id}`))
    };

    const handleDeleteTag = (tagObject) => {
        if (window.confirm(`Are you sure you want to delete ${tagObject.name}?`)) {
            deletePostTag(tagObject.id).then(getTagsByPostId(id));
            history.push(`/tagManager/${id}`);
        }
    };

    return (

        <>
            <FormGroup>

                <Label for="postTag">Add a Tag </Label><br></br>
                <select id="postTag" onChange={(e) => setPostTag(e.target.value)}>
                    <option value="0">Select a tag </option>
                    {
                        tags.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))
                    }
                </select>
                <Button onClick={handleSavePostTagButton}>Add Tag</Button>
            </FormGroup>
            {listOfTags.map(pt => (
            
            <Card className="m-4">
                <CardBody>
                    <p>{pt.name}</p>
                </CardBody>
                <CardFooter>
                    <Button color="danger" onClick={() => setChosenTag(pt)}>Delete</Button>
                </CardFooter>
            </Card>

            ))}
        </>
    )
}

export default PostTagList;