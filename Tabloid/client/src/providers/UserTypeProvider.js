import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const UserTypeContext = React.createContext();

export const UserTypeProvider = (props) => {
  const apiUrl = "/api/usertype";
  const { getToken } = useContext(UserProfileContext);

  const updateUserType = (userProfile) => {
      return getToken().then((token) =>
        fetch(`${apiUrl}/${userProfile.id}/${userProfile.userTypeId}`, {
            method: "PUT",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            },
            body: JSON.stringify()
        })
      )
  }

  const getAllUserTypes = () => {
      return getToken().then((token) =>
        fetch(`${apiUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
      )
  }

  return (
    <UserTypeContext.Provider value={{updateUserType, getAllUserTypes}}>
      {props.children}
    </UserTypeContext.Provider>
  )
} 
