import React from "react";
import { Button, Col, Row } from "reactstrap";

const UserProfileDetails = () => {
    return (
        <div className="container">
            <Row>
                <Col sm ="5" md="4" lg="3">
                    <img src="https://robohash.org/numquamutut.png?size=150x150&set=set1" className="img-thumbnail"/>
                </Col>
                <Col>
                    <h2>Foo</h2>
                    <h5>Foo	Barington</h5>
                    <br/>
                    <Row>
                        <Col md="3" lg="3" >
                            <h5>Email:</h5>
                            <p>foo@bar.com</p>
                        </Col>
                        <Col md="5" lg="4">
                            <h5>Account Created:</h5>
                            <p>2020-04-23</p>
                        </Col>
                        <Col md="2" lg="3">
                            <h5>Role:</h5>
                            <p>admin</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col sm ="2" md="2" lg="2">
                <div>
                    <Button>Back</Button>
                </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserProfileDetails;