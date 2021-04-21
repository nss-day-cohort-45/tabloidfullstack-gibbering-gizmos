import { PostTagContext } from "../../providers/PostTagProvider";
import { TagContext } from "../../providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react"
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
  } from "reactstrap";


const PostTagList = () => {
    const { tags, getAllTags, setTags } = useContext(TagContext);
    const { addPostTag } = useContext(PostTagContext);
    const  { id } = useParams();
    const history = useHistory();
    const [postTag, setPostTag] = useState("");

    useEffect(() => {
        getAllTags().then(setTags);
    }, []);

    const handleSavePostTagButton = () => {
        const newPostTag = {
            ...postTag
          };
          newPostTag.tagId = postTag
          newPostTag.postId = id
        
          addPostTag(newPostTag)
        .then(history.push(`/posts/${id}`))
    };
return (

    <FormGroup>

        <Label for="postTag">Add a Tag </Label><br></br>
        <select id="postTag" onChange={(e) => setPostTag(e.target.value)}>
            <option value="0">Select a tag </option>
            {
                tags.map(t => (
                    <option key={t.id} value={t.id}>
                        {t.name}
                    </option>
                ))
            }
        </select>
        <Button onClick={handleSavePostTagButton}>Add Tag</Button>
    </FormGroup>
    
)
}  

export default PostTagList;
