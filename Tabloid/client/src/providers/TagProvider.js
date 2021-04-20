import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const apiUrl = "/api/tag";
  const [tags, setTags] = useState([]);

  const getAllTags = () => {
    return fetch(apiUrl)
      .then((res) => res.json())
      
  }

  const updateTag = (tag) => {
    return fetch(`${apiUrl}/${tag.id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
    }
  }

  return (
    <TagContext.Provider value={{tags, setTags, getAllTags}}>
      {props.children}
    </TagContext.Provider>
  )
} 
