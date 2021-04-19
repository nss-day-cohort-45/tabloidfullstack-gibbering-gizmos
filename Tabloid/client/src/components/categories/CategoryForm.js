import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from '../../providers/CategoryProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const CategoryForm = () => {
    const { addCategory } = useContext(CategoryContext);
    const history = useHistory();
    const [Name, setName] = useState("");

    const SaveButton = (e) => {
        const category = {
            Name,
        };

        addCategory(category).then((c) => {
            history.push("/categories");
        });
    };

    return (
        <Form>
            <FormGroup>
                <Label for="categoryName">Category Name:</Label>
                <Input id="categoryName" type="text" onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Button onClick={SaveButton}>Save</Button>
            </FormGroup>
        </Form>
    );
}
export default CategoryForm;
