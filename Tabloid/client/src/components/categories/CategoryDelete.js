import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";
import { CategoryContext } from '../../providers/CategoryProvider';
import { useHistory, useParams } from "react-router-dom";

const CategoryDelete = () => {
    
    const {id } = useParams();
    const [category, setCategory] = useState({});
    const history = useHistory();
    const {deleteCategory, getCategoryById, getAllCategories} = useContext(CategoryContext)
    
    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile) //use this for admin check later

    useEffect(() => {
        getCategoryById(id).then(setCategory)
    }, [])

    const deleteIt = () => {
        deleteCategory(id)
            .then(getAllCategories())
            .then(history.push(`/categories`))
    }

    const cancelIt = () => {
        history.push(`/categories`)
    }


    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardHeader>
                        <h2 className="text-left px-2">
                            <strong>Are you sure you want to delete this?</strong>
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <p>Category: {category.name}</p>
                    </CardBody>
                    <CardFooter>
                        <Button color="info" onClick={deleteIt}>Delete</Button>
                        <Button color="info" onClick={cancelIt}>Cancel</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default CategoryDelete;
