import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const apiUrl = "/api/tag";
    const [tags, setTags] = useState([]);

    const getAllTags = () => {
        return fetch(apiUrl).then((res) => res.json());
    };

    const addTag = (tag) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        });
    };

    return (
        <TagContext.Provider value={{ tags, setTags, getAllTags, addTag }}>
            {props.children}
        </TagContext.Provider>
    );
};
