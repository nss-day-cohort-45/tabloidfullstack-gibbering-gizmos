import React, { useState, useContext } from "react";

export const TagContext = React.createContext();

export const tagProvider = (props) => {
  const apiUrl = "/api/tag";
  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    return fetch(apiUrl)
      .then((res) => res.json())
      .then(setTags);
  }

  return (
    <CategoryContext.Provider value={{tags, setTags, getAllTags}}>
      {props.children}
    </CategoryContext.Provider>
  )
} 
