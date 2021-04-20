import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

const TagForm = () => {
    const { addTag } = useContext(TagContext);
    const history = useHistory();
    const [Name, setName] = useState("");

    const SaveButton = (e) => {
        const tag = {
            Name,
        };

        addTag(tag).then((c) => {
            history.push("/tags");
        });
    };

    const backButton = () => {
        history.push("/tags");
    }

    return (
        <Form>
            <FormGroup>
                <Label for="tagName">Tag Name: </Label>
                <Input
                    id="tagName"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Button onClick={SaveButton}>Save</Button>
                <Button onClick={backButton}>Back</Button>
            </FormGroup>
        </Form>
    );
};
export default TagForm;
