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
  const [tag, setTag] = useState({})
  const history = useHistory();

  //field state
  const [name, setName] = useState("");

  useEffect(() => {
    getTagById(id).then(setTag)
  }, []);

  useEffect(() => {
    setTag(tag.name)
  }, [category])

  const submit = (e) => {
    const updatedTag = {
      ...tag
    };

    updatedTag.name = name

    updateTag(updatedTag).then((t) => {
      history.push(`/tags`);
    });
  }

  const cancel = () => {
    history.push(`/tags`);
  }

  if (tag === null)
  {
    return null
  }

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" onchange={(e) => setName(e.target.value)} value={name}/>
              </FormGroup>
            </Form>
            <Button color="info" onclick={submit}>Submit</Button>
            <Button color="danger" onClick={cancel}>Cancel</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default TagEdit;
