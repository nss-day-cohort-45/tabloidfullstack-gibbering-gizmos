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

  return (
    <CategoryContext.Provider value={{categories, setCategories, getAllCategories}}>
      {props.children}
    </CategoryContext.Provider>
  )
} 
