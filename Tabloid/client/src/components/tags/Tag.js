import React from "react";
import { Button, Card, CardBody, CardFooter, Col } from "reactstrap";
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
    <Col md="6" lg="4">
      <Card className="m-4">
        <CardBody>
          <p>{tag.name}</p>
        </CardBody>
        <CardFooter>
          <Button color="info" onClick={edit}>Edit</Button>
          <Button color="danger" onClick={deleteTag}>Delete</Button>
        </CardFooter>
      </Card>
    </Col>
  );
}  

export default Tag;
