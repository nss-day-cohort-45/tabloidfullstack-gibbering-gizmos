import React from "react";
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

const Tag = ({tag}) => {

  const history = useHistory();

  return (
    <Card className="m-4">
      <CardBody>
        <p>{tag.name}</p>
      </CardBody>
      <CardFooter>

      </CardFooter>
    </Card>
  );
}  

export default Tag;
