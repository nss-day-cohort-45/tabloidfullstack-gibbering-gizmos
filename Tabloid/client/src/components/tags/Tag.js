import React from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

const Tag = ({tag}) => {

  const history = useHistory();

  const edit = () => {
    history.push(`/tags/edit/${tag.id}`)
  }

  const deleteTag = () => {
    history.push(`/tags/delete/${tag.id}`)
  }

  return (
    <Card className="m-4">
      <CardBody>
        <p>{tag.name}</p>
      </CardBody>
      <CardFooter>
        <Button color="info" onClick={edit}>Edit</Button>
        <Button color="danger" onClick={deleteTag}>Delete</Button>
      </CardFooter>
    </Card>
  );
}  

export default Tag;
