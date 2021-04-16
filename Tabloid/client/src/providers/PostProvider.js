import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const apiUrl = "/api/post";
    const [posts, setPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);

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

    return (
        <PostContext.Provider value={{ posts, setPosts, getUserPosts}}>
            {props.children}
        </PostContext.Provider>
    )
}