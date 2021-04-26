import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const UserProfiles = () => {
    const {getAllProfiles, reactivateUserById} = useContext(UserProfileContext);
    const [profiles, setProfiles] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getAllProfiles().then(setProfiles);
    }, []);

    const deactivate = (id) => {
        history.push(`/deactivateuser/${id}`);
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
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Display Name</th>
                                <th>User Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                profiles.map(p => {
                                    return p.deactivated === false ?
                                    
                                    <tr key={p.id}>
                                        <td>{p.fullName}</td>
                                        <td>{p.displayName}</td>
                                        <td>{p.userType.name}</td>
                                        <td>
                                        <Button
                                        value={p.fullName}
                                        onClick={() =>
                                            history.push(
                                                `/userprofiles/${p.id}`
                                            )
                                        }
                                    >
                                        View
                                    </Button>

                                            <Button onClick={() => history.push(`/userprofiles/edit/${p.id}`)}>Edit</Button>
                                            <Button color="danger" onClick={() => deactivate(p.id)}>Deactivate</Button>
                                        </td>
                                    </tr>

                                    :

                                    <tr>
                                        <td>{p.fullName}</td>
                                        <td>{p.displayName}</td>
                                        <td>{p.userType.name}</td>
                                        <td>
                                        <Button
                                        value={p.fullName}
                                        onClick={() =>
                                            history.push(
                                                `/userprofiles/${p.id}`
                                            )
                                        }
                                    >
                                        View
                                    </Button>
                                            <Button onClick={() => history.push(`/userprofiles/edit/${p.id}`)}>Edit</Button>
                                            <Button color="success" onClick={() => reactivate(p.id)}>Reactivate</Button>
                                        </td>
                                    </tr>

                                })
                            }
                        </tbody>
                            
                    </table>
                </div>
            </div>
        </>
    )

}

export default UserProfiles;
