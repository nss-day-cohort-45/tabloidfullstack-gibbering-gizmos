import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = React.createContext();


export const PostTagProvider = (props) => {

    const apiUrl = '/api/PostTag'
const {getToken} = useContext(UserProfileContext)
const [lastPage, setLastPage] = useState(0);
const [postTags, setPostTags] = useState([]);

const getPostTagById = (id) => {
    return getToken().then((token) => {
        return fetch(`/api/PostTag/GetPostTagById/${id}`, {
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
    return getToken().then((token) =>
        fetch(apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postTag),
    }))
};

const getTagsByPostId = (id) => {
    return getToken().then((token) => {
        return fetch(`/api/PostTag/GetTagsByPostId/${id}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }).then((res) => res.json())
    })
}

return (
    <PostTagContext.Provider value={{ postTags, setPostTags, addPostTag, deletePostTag, getPostTagById, getTagsByPostId, lastPage, setLastPage }}>
        {props.children}
    </PostTagContext.Provider>
);

};
