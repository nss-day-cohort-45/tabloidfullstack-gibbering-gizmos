import React, { useState, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from '../providers/CategoryProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const CategoryForm = () => {
    const { addCategory, getAllCategories } = useContext(CategoryContext);
    const [category, setCategory] = useState({
        name: ""
    });

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const handleControlledInputChange = (event) => {
        const newCategory = { ...category }
        newCategory[event.target.id] = event.target.value

        setCategory(newCategory)
    }

    useEffect(() => {

    }, [category])

    const handleClickSaveCategory = () => {
        const name = category.name

        if (name === "") {
            window.alert("Please type in title of category")
        }
        else {
            setIsLoading(true);

            addCategory({
                name: category.name
            })
                .then(() => setIsLoading(false))
                .then(getAllCategories)
        }
        return (
            <Form className="category form">
                <h2>New Category</h2>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Category name"
                        autoComplete="off"
                        onChange={handleControlledInputChange}
                    />
                </FormGroup>

                <Button onClick={handleClickSaveCategory}>Submit</Button>
            </Form>
        );
    };
}
export default CategoryForm;