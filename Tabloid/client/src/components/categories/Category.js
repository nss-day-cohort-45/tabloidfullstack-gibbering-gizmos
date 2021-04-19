import React from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";

const Category = ({category}) => {

  return (
    <Card className="m-4">
      <CardBody>
        <p>{category.name}</p>
      </CardBody>
      <CardFooter>
        <Button>Edit</Button>
        <Button color="danger">Delete</Button>
      </CardFooter>
    </Card>
  );
}  

export default Category;
