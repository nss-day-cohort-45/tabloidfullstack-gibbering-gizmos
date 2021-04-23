import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import {UserProfileContext} from '../../providers/UserProfileProvider'
import {UserTypeContext} from '../../providers/UserTypeProvider'

const UserEdit = () => {
    const {getUserProfileById, getAllProfiles} = useContext(UserProfileContext)
    const {getAllUserTypes, updateUserType} = useContext(UserTypeContext)
    const { id } = useParams()
    const history = useHistory()
    const [userProfile, setUserProfile] = useState({})
    const [userTypes, setUserTypes] = useState([])
    const [newUserType, setNewUserType] = useState(0)
    const [allProfiles, setAllProfiles] = useState([])
    
    useEffect(() => {
        getUserProfileById(id)
            .then(setUserProfile)
            .then(getAllUserTypes)
            .then(setUserTypes)
            .then(getAllProfiles)
            .then(setAllProfiles)
    }, [])

    const submit = (e) => {
                  
        userProfile.userTypeId = newUserType
          
          // Update the database with the new post
          updateUserType(userProfile).then((p) => {
            // Navigate the user back to the home route
            history.push(`/userprofiles/`);
          });
        
    };
    const cancel = (e) => {
        
        history.push(`/userprofiles/`);
        
    };


    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                <CardBody>
                    <Form>
                    <FormGroup>
                        User: {userProfile.displayName} <br></br>
                        <Label for="userType">User Type: </Label>
                        <select id="category" onChange={(e) => setNewUserType(e.target.value)}>
                            <option value="0">Select a category </option>
                            {
                                userTypes.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))
                            }
                        </select>
                    </FormGroup>
                    
                    </Form>
                    <Button color="info" onClick={submit}>
                    Save
                    </Button>
                    <Button color="info" onClick={cancel}>
                    Cancel
                    </Button>
                </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default UserEdit;