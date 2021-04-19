import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const apiUrl = "/api/tag";
  const [tag, setTag] = useState([]);

  const getAllTags = () => {
    return fetch(apiUrl)
      .then((res) => res.json())
      .then(setTag);
  }

  return (
    <TagContext.Provider value={{tag, setTag, getAllTags}}>
      {props.children}
    </TagContext.Provider>
  )
} 
