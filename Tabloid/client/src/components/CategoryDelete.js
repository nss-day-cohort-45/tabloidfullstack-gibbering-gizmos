import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import { CategoryContext } from '../providers/CategoryProvider';
import { useHistory, useParams } from "react-router-dom";

const CategoryDelete = () => {
    const {id } = useParams();

    const history = useHistory();
    
    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile)

    
}