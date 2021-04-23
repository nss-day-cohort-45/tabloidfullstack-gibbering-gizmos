import React, { useState, useContext, useEffect} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  Input,
  Button
} from "reactstrap";
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { useHistory, useParams } from "react-router-dom";

const UserDeactivate = () => {
    const  { id } = useParams();
    const {getUserProfileById, deactivateUserById, getAllProfiles} = useContext(UserProfileContext)
    const [userProfile, setUserProfile] = useState({})
    const [userProfiles, setUserProfiles] = useState([])
    const history = useHistory();

    useEffect(() => {
        getUserProfileById(id).then(setUserProfile).then(getAllProfiles).then(setUserProfiles)
    }, [])

    const submit = () => {
        
        const admins = userProfiles.filter(a => a.userTypeId === 1 && a.deactivated === false)
        // const activeAdmins = admins.filter(a => a.deactivated === false)

        if(admins > 1)
        {
            deactivateUserById(id).then(() => history.push(`/userprofiles`))
        }
        else if(userProfile.userTypeId === 2)
        {
            deactivateUserById(id).then(() => history.push(`/userprofiles`))
        }
        else
        {
            window.alert("You need to make someone else an admin before deactivating the only admin!")
        }
        
    }

    const cancel = () => {
        history.push(`/userprofiles`)
      };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardHeader>User Deactivation</CardHeader>
                    <CardBody>
                        Are you sure you want to deactivate the profile associated with <strong>{userProfile.fullName}</strong>?
                    </CardBody>
                    <CardFooter>
                        <Button color="info" onClick={submit}>Yes</Button>
                        <Button color="danger" onClick={cancel}>Cancel</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default UserDeactivate;