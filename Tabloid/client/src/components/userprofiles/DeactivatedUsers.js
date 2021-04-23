import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const DeactivatedUsers = () => {
    const {getDeactivatedUserProfiles, reactivateUserById} = useContext(UserProfileContext);
    const [profiles, setProfiles] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getDeactivatedUserProfiles().then(setProfiles)
    }, []);

    const reactivate = (id) => {
        reactivateUserById(id).then(getDeactivatedUserProfiles).then(setProfiles)
    };



    return (
        <>            
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

export default DeactivatedUsers;