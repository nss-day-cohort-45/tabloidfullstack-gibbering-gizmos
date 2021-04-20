import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import { TagContext } from '../../providers/TagProvider'
import { useHistory, useParams } from "react-router-dom";

const DeleteTag = () => {
    const {getTagById, deleteTag, getAllTags} = useContext(TagContext);
    const {id } = useParams();
    const [tag, setTag] = useState({});
    const history = useHistory();


    useEffect(() => {
        getTagById(id).then(setTag);
    }, [])

    const deleteIt = () => {
        deleteTag(id)
            .then(getAllTags())
            .then(history.push(`/tags`))
    }

    const cancelIt = () => {
        history.push(`/tags`)
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
                        <p>Tag: {tag.name}</p>
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

export default DeleteTag;
