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

  return ()
}
