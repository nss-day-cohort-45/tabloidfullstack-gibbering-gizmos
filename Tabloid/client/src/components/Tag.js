import React from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

const Tag = ({Tag}) => {

  const history = useHistory();

  return (
    <Card className="m-4">
      <CardBody>
        <p>{Tag.name}</p>
      </CardBody>
      <CardFooter>

      </CardFooter>
    </Card>
  );
}  

export default Tag;
