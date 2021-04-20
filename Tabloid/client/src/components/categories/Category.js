import React from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

const Category = ({category}) => {

  const history = useHistory();

  const edit = () => {
    history.push(`/categories/edit/${category.id}`)
  }

  const deleteIt = () => {
    history.push(`/categories/delete/${category.id}`)
  }

  return (
    <Card className="m-4">
      <CardBody>
        <p>{category.name}</p>
      </CardBody>
      <CardFooter>
        <Button color="info" onClick={edit}>Edit</Button>
        <Button color="danger" onClick={deleteIt}>Delete</Button>
      </CardFooter>
    </Card>
  );
}  

export default Category;
