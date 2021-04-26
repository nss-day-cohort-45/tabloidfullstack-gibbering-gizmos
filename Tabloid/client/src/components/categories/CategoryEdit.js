import React, { useState, useContext, useEffect} from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button
} from "reactstrap";
import { CategoryContext } from '../../providers/CategoryProvider';
import { useHistory, useParams } from "react-router-dom";

const CategoryEdit = () => {
  
  const {updateCategory, getCategoryById} = useContext(CategoryContext)
  const  { id } = useParams();
  const [category, setCategory] = useState({
    name: ""
  })
  const history = useHistory();

  //field state
  const [name, setName] = useState("");

  useEffect(() => {
    getCategoryById(id).then(setCategory)
  }, []);

  useEffect(() => {
    setName(category.name)
  }, [category])

  const submit = (e) => {
    const updatedCategory = {
      ...category
    };

    updatedCategory.name = name

    updateCategory(updatedCategory).then((c) => {
      history.push(`/categories`);
    });
  };

  const cancel = () => {
    history.push(`/categories`);
  };

  if (category === null)
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
                <Input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name}/>
              </FormGroup>
            </Form>
            <Button color="info" onClick={submit}>
              Submit
            </Button>
            <Button color="danger" onClick={cancel}>Cancel</Button>
          </CardBody>
        </Card> 
      </div>
    </div>
  )
} 

export default CategoryEdit;
