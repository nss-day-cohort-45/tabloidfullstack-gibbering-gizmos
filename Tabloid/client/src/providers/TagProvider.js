import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const apiUrl = "/api/tag";
  const [tags, setTags] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllTags = () => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
      .then((res) => res.json()))
  };

  const getTagById = (id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${id}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }).then((res) => res.json())
    })
  }

  const deleteTag = (id) => {
      return getToken().then((token) =>
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
      );
  }

  const addTag = (tag) => {
    return getToken().then((token) =>
            fetch(apiUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,  
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        }))
  };

  const updateTag = (tag) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${tag.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,  
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
      }))
  }

    return (
        <TagContext.Provider value={{ tags, setTags, getAllTags, addTag, deleteTag, getTagById, updateTag }}>
            {props.children}
        </TagContext.Provider>
    );
};
