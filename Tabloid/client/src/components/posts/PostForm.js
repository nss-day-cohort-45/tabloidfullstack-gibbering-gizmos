import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../../providers/PostProvider"
import { CategoryContext } from '../../providers/CategoryProvider';
import { useHistory } from 'react-router-dom';

export const PostForm = () => {
  const { addPost, getAllPosts } = useContext(PostContext)
  const { categories, getAllCategories } = useContext(CategoryContext);
  const history = useHistory();
  // This is returning JSON
  const userProfile = sessionStorage.getItem("userProfile");
  // Parsing the JSON returned above into an object so we can use it
  var currentUser = JSON.parse(userProfile)

  // Set the initial state for the post.
  const [post, setPost] = useState({
    title: "",
    content: "",
    imageLocation: "",
    publishDateTime: "",
    isApproved: true,
    categoryId: 0
  });


  const [isLoading, setIsLoading] = useState(false);
  const [postObj, setPostObj] = useState({});

  const handleControlledInputChange = (event) => {
    const newPost = { ...post }

    newPost[event.target.id] = event.target.value
    setPost(newPost)
  }

  useEffect(() => {
    getAllCategories()
  }, [post])

  // Handle clicking the save button and updating the initial post object with the info from the form, then checking all the fields to make sure they have information in them.
  const handleClickSavePost = () => {

    const title = post.title
    const content = post.content
    const imageLocation = post.imageLocation
    const publishDateTime = post.publishDateTime
    const categoryId = parseInt(post.categoryId)


    if (title === "") {
      window.alert("Please type in title of post")
    }

    else if (content === "") {
      window.alert("Please fill out content")
    }

    else if (imageLocation === "") {
      window.alert("Please insert image")
    }

    else if (publishDateTime === "") {
      window.alert("Please select a date")
    }

    else if (categoryId === 0 || categoryId === NaN) {
      window.alert("Please select a category")
    }

    else {
      setIsLoading(true);

      addPost({
        title: post.title,
        content: post.content,
        imageLocation: post.imageLocation,
        publishDateTime: post.publishDateTime,
        isApproved: true,
        categoryId: categoryId,
        userProfileId: parseInt(currentUser.id),
        dateCreated: Date.now
      })
        .then(setPostObj)
        .then(() => setIsLoading(false))
        .then(getAllPosts)
    }
  }

  useEffect(() => {
    if (postObj.id > 0) {
      history.push(`/posts/${postObj.id}`);
    }
  }, [postObj])

  return (
    <>
      <form className="postForm">
        <h2 className="postForm__title">Add new post</h2>

        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={post.title} />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="content">Content: </label>
            <input type="text" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control"
              placeholder="Content" value={post.content} />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="imageLocation">Image URL: </label>
            <input type="text" id="imageLocation" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Image" value={post.imageLocation} />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="publishDateTime">Published Date Time: </label>
            <input type="date" id="publishDateTime" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Published Date Time" value={post.publishDateTime} />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="categoryId">Category: </label>
            <select value={post.categoryId} id="categoryId" className="form-control" onChange={handleControlledInputChange}>
              <option value="0">Select a category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <button className="btn btn-primary"
          disabled={isLoading}
          onClick=
          {event => {
            event.preventDefault()
            handleClickSavePost()
          }}>
          Add post</button>
      </form>
    </>
  )
}

export default PostForm;
