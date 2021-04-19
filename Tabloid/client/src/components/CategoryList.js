import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import Category from "./Category";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const CategoryList = () => {
  const {categories, getAllCategories } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
      <Button onClick={editPost}>Edit</Button>
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
