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
    CardFooter,
    CardHeader
} from "reactstrap";

export const PostTagDelete = () => {
    const { tags, getAllTags, setTags } = useContext(TagContext);
    const { addPostTag, setPostTags, getTagsByPostId, deletePostTag, getPostTagById, lastPage } = useContext(PostTagContext);
    const { id } = useParams();
    const history = useHistory();
    const [postTag, setPostTag] = useState("");
    const [listOfTags, setListOfTags] = useState([]);
    const [chosenTag, setChosenTag] = useState({});

    useEffect(() => {
        getPostTagById(id).then(setChosenTag)
    }, [])

    const handleDeleteTag = () => {
        deletePostTag(chosenTag.id)
        .then((t) => {history.push(`/tagManager/${lastPage}`);
        })
            .then((t) => {
                getTagsByPostId(id);
            });
    }

    const cancelIt = () => {
        history.push(`/tagManager/${id}`)
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
                        <p>Tag: {chosenTag.name}</p>
                    </CardBody>
                    <CardFooter>
                        <Button color="info" onClick={handleDeleteTag}>Delete</Button>
                        <Button color="info" onClick={cancelIt}>Cancel</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
    
export default PostTagDelete;