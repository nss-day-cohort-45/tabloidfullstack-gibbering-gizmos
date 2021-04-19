import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const apiUrl = "/api/category";
  const [categories, setCategories] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllCategories = () => {
    return fetch("/api/category")
      .then((res) => res.json())
      .then(setCategories);
  }

  const addCategory = (category) => {
    return fetch(apiUrl , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
  };

  const updateCategory = (category) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}/${category.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    }))
  }

  return (
    <CategoryContext.Provider value={{categories, setCategories, getAllCategories, addCategory}}>
      {props.children}
    </CategoryContext.Provider>
  )
} 
