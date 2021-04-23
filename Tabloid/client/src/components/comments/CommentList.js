import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from  "./Comment";
import { Button } from "reactstrap";
import { useHistory, useParams, Link } from 'react-router-dom';

const CommentList = () => {
  const { comments, setComments, getAllCommentsOnPost} = useContext(CommentContext);
  const history = useHistory();
  const { id } = useParams();

  // The "id" here is the post id from post details. The variable has to be called "id", so it's a bit confusing. NOT the comment id.
  useEffect(() => {
    getAllCommentsOnPost(parseInt(id))
    .then(setComments)
    .then(console.log(comments))
  }, []);


  return (
    <div className="container">
      <Link to={`/posts/${id}`}>Back to Post</Link>
      <div className="row justify-content-center">
        <div className="cards-column">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommentList;
