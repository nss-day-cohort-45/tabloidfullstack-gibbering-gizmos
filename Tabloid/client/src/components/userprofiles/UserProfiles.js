import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const UserProfiles = () => {
    const {getAllProfiles} = useContext(UserProfileContext);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        getAllProfiles().then(setProfiles)
    }, []);

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <table>
                    <tr>
                        <th></th>
                        <th>Full Name</th>
                        <th>Display Name</th>
                        <th>User Type</th>
                    </tr>
                    
                        {
                            profiles.map(p => (
                                
                                <tr>
                                    <td>
                                        <Button onClick="">View</Button>
                                        <Button hidden>Active</Button>
                                        <Button hidden>Edit</Button>
                                    </td>
                                    <td>{p.fullName}</td>
                                    <td>{p.displayName}</td>
                                    <td>{p.userType.name}</td>
                                </tr>
                                
                            ))
                        }
                        
                </table>
            </div>
        </div>
    )

}

export default UserProfiles;