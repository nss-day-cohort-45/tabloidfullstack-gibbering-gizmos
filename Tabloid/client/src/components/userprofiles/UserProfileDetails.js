import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Portrait_Placeholder from "./Portrait_Placeholder.png"

const UserProfileDetails = () => {
    const { getUserProfileById } = useContext(UserProfileContext);
    const [profile, setProfile] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getUserProfileById(id).then(setProfile);
    }, []);

    const UserImage = () => {
        if (profile.imageLocation !== null) {
            return profile.imageLocation;
        } else {
            return Portrait_Placeholder;
        }
    };

    return (
        <div className="container">
            <Card>
                <CardBody>
                    <Row>
                        <Col sm="5" md="4" lg="3">
                            <img
                                src={UserImage()}
                                className="img-thumbnail"
                                style={{width: "160px"}}
                            />
                        </Col>
                        <Col>
                            <h2>{profile.displayName}</h2>
                            <h5>{profile.fullName}</h5>
                            <br />
                            <Row>
                                <Col lg="6">
                                    <h5>Email:</h5>
                                    <p>{profile.email}</p>
                                </Col>
                                <Col md="6" lg="4">
                                    <h5>Account Created:</h5>
                                    <p>
                                        {
                                            new Date(profile.createDateTime)
                                                .toLocaleString("en-US")
                                                .split(", ")[0]
                                        }
                                    </p>
                                </Col>
                                <Col md="3" lg="2">
                                    <h5>Role:</h5>
                                    <p>{profile.userType?.name}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col>
                            <div style={{ float: "right" }}>
                                <Button
                                    onClick={() =>
                                        history.push(`/userprofiles`)
                                    }
                                >
                                    Back
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UserProfileDetails;
