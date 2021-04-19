import React, { useState, useContext } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const apiUrl = "/api/category";
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    return fetch("/api/category")
      .then((res) => res.json())
      .then(setCategories);
  }
  const addCategory = (category) => {
    return getToken().then((token) =>
    fetch(`${apiUrl}/${category}`, {
        method: "POST",
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
