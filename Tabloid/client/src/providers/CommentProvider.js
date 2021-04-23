import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
  const apiUrl = "/api/comment";
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(0)
  const { getToken } = useContext(UserProfileContext);

  const getAllCommentsOnPost = (id) => {
    return getToken().then((token) =>
    fetch(`/api/Comment/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json()));
  }

  const addComment = (comment) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
    .then((res) => res.json()));
  }

  return (
    <CommentContext.Provider value={{ comments, setComments, postId, setPostId, getAllCommentsOnPost, addComment }}>
      {props.children}
    </CommentContext.Provider>
  )
}
