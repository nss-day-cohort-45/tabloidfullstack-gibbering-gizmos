import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = React.createContext();


export const PostTagProvider = (props) => {

    const apiUrl = '/api/postTag'
const {getToken} = useContext(UserProfileContext)

const [postTags, setPostTags] = useState([]);

const getPostTagById = (id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${id}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }).then((res) => res.json())
    })
  }

  const deletePostTag = (id) => {
      return getToken().then((token) =>
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
      );
  }

  const addPostTag = (postTag) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postTag),
    });
};

return (
    <PostTagContext.Provider value={{ postTags, setPostTags, addPostTag, deletePostTag, getPostTagById }}>
        {props.children}
    </PostTagContext.Provider>
);

};
