import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import Category from "./Category";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CategoryForm from "./CategoryForm";
import { useHistory } from 'react-router-dom';

const CategoryList = () => {
  const {categories, getAllCategories } = useContext(CategoryContext);
  const history = useHistory();
  useEffect(() => {
    getAllCategories();
  }, []);

const addCatForm = () => {
  history.push('/categories/add');
}

  return (
    <div className="container">
      <Button onClick={addCatForm}>Add Category</Button>
      <div className="row justify-content-center">
      {/* <Button onClick={editPost}>Edit</Button> */}
        <div className="cards-column">
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
