import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
  const apiUrl = "/api/tag";
  const [tags, setTags] = useState([]);
  const { getToken } = useContext(UserProfileContext);

    const getAllTags = () => {
        return fetch(apiUrl).then((res) => res.json());
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
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        });
    };

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
        <TagContext.Provider value={{ tags, setTags, getAllTags, addTag, deleteTag, getTagById }}>
            {props.children}
        </TagContext.Provider>
    );
};
