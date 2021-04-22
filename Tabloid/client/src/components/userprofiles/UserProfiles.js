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
                        <th>Full Name</th>
                        <th>Display Name</th>
                        <th>User Type</th>
                    </tr>
                    
                        {
                            profiles.map(p => (
                                
                                <tr>
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