import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button
} from "reactstrap";
import { TagContext } from '../../providers/TagProvider';
import { useHistory, useParams } from "react-router-dom";

const TagEdit = () => {
  const {updateTag, getTagById} = useContext(TagContext)
  const { id } = useParams();
  const [tag, setTag] = useState({
    name: ""
  })
  const history = useHistory();

  //field state
  const [name, setName] = useState("");

  useEffect(() => {
    getTagById(id).then(setTag)
  }, []);

  useEffect(() => {
    setName(tag.name)
  }, [tag])

  const submit = (e) => {
    const updatedTag = {
      ...tag
    };

    updatedTag.name = name

    updateTag(updatedTag)
      .then(() => history.push(`/tags`));
  };
  

  const cancel = () => {
    history.push(`/tags`);
  }

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" onChange={(e) => setName(e.target.value)} value={name}/>
              </FormGroup>
            </Form>
            <Button color="info" onClick={submit}>Submit</Button>
            <Button color="danger" onClick={cancel}>Cancel</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default TagEdit;
