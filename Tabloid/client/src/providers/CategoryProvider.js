import React, { useState, useContext } from "react";
import UserProfileContext from './UserProfileProvider'

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

  const deleteCategory = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }))
  }

  

  return (
    <CategoryContext.Provider value={{categories, setCategories, getAllCategories, deleteCategory}}>
      {props.children}
    </CategoryContext.Provider>
  )
} 
