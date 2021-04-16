import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const apiUrl = "/api/post";
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllPosts = () => {
      return fetch("/api/post")
        .then((res) => res.json())
        .then(setPosts);
    }

    const getUserPosts = (id) => {
        return getToken().then((token) =>
        fetch(`${apiUrl}/GetAllPostsByUserId?id=${id}`, {
          method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => res.json()));
      }
    
    const updatePost = (post) => {
        return getToken().then((token) =>
        fetch(`${apiUrl}/${post.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        }))
    }
    
    return (
        <PostContext.Provider value={{ posts, setPosts, getUserPosts, updatePost}}>
            {props.children}
        </PostContext.Provider>
    )
}
