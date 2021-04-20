import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const apiUrl = "/api/tag";
  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    return fetch(apiUrl)
      .then((res) => res.json())
      
  }

  return (
    <TagContext.Provider value={{tags, setTags, getAllTags}}>
      {props.children}
    </TagContext.Provider>
  )
} 
