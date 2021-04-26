import React, { useContext, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag";
import { Button, Form, FormGroup, Label, Input, CardDeck } from "reactstrap";
import { useHistory } from "react-router";

const TagList = () => {
    const { tags, getAllTags, setTags } = useContext(TagContext);

    const history = useHistory();
    
    useEffect(() => {
        getAllTags().then(setTags);
    }, []);

    const handleAddTagButton = () => {
        history.push("/tags/add");
    };

    return (
        <div className="container">
            <Button onClick={handleAddTagButton}>Add Tag</Button>
            <div className="row justify-content-center">
                <CardDeck>
                    {tags.map((tag) => (
                        <Tag key={tag.id} tag={tag} />
                    ))}
                </CardDeck>
            </div>
        </div>
    );
};

export default TagList;
