import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const UserProfiles = () => {
    const {getAllProfiles, reactivateUserById} = useContext(UserProfileContext);
    const [profiles, setProfiles] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getAllProfiles().then(setProfiles)
    }, []);


    const deactivate = (id) => {
        history.push(`/deactivateuser/${id}`)
    };

    const reactivate = (id) => {
        reactivateUserById(id).then(getAllProfiles).then(setProfiles)
    };

    const viewDeactivated = () => {
        history.push(`/deactivatedusers`)
    }

    return (
        <>
            <div className="container pt-4">
                <Button color="primary" onClick={viewDeactivated}>View Deactivated Users</Button>
            </div>
            
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <table>
                        <tr>
                            <th>Full Name</th>
                            <th>Display Name</th>
                            <th>User Type</th>
                            <th>Activation</th>
                        </tr>
                            {
                                profiles.map(p => {
                                    return p.deactivated === false ?
                                    
                                    <tr>
                                        <td>{p.fullName}</td>
                                        <td>{p.displayName}</td>
                                        <td>{p.userType.name}</td>
                                        <td>
                                            <Button color="danger" onClick={() => deactivate(p.id)}>Deactivate</Button>
                                        </td>
                                    </tr>

                                    :

                                    <tr>
                                        <td>{p.fullName}</td>
                                        <td>{p.displayName}</td>
                                        <td>{p.userType.name}</td>
                                        <td>
                                            <Button color="success" onClick={() => reactivate(p.id)}>Reactivate</Button>
                                        </td>
                                    </tr>

                                })
                            }
                            
                    </table>
                </div>
            </div>
        </>
    )

}

export default UserProfiles;