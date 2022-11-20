import { useState } from "react";
import "./Comments.css";
import { AvatarGenerator } from "random-avatar-generator";
import LikeDislike from "./LikeDislike";

const Comments = ({ id }) => {
  const [addComment, setAddComment] = useState({
    commenter: "",
    comment: "",
  });
  const [comments, setComments] = useState(
    JSON.parse(window.localStorage.getItem(id)) || []
  );
  const generator = new AvatarGenerator();

  function handleComments(e) {
    const newObj = { ...addComment };
    newObj[e.target.id] = e.target.value;
    setAddComment(newObj);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newComments = [...comments, addComment];
    // console.log(newComments);
    window.localStorage.setItem(id, JSON.stringify(newComments));
    // console.log(window.localStorage);
    setComments(newComments);
    setAddComment({ commenter: "", comment: "" });
  }

  // localStorage.clear()
  return (
    <div>
      <form onSubmit={handleSubmit} className="comment-form">
        <label>
          <input
            id="commenter"
            type="text"
            value={addComment.commenter}
            onChange={handleComments}
            placeholder="Commenting as..."
            required
          />
        </label>
        <br />
        <label>
          <input
            id="comment"
            type="text"
            value={addComment.comment}
            onChange={handleComments}
            placeholder="Add a comment..."
            required
          />
        </label>
        <br />
        <br />

        <button className="comment-button">Comment</button>
      </form>
      <ul id="comment-section">
        {comments.map((comment, index) => {
          return (
            <li key={index} className="user-comment">
              <h3>
                <img
                  className="avatar"
                  src={generator.generateRandomAvatar()}
                />{" "}
                {comment.commenter}
              </h3>
              <p className="comment">{comment.comment}</p>
              <LikeDislike /> <button className="reply">Reply</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;
