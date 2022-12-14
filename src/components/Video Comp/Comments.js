import { useState } from "react";
import "./Comments.css";
import { AvatarGenerator } from "random-avatar-generator";
import LikeDislike from "./LikeDislike";

const Comments = ({ id }) => {
  const [addComment, setAddComment] = useState({
    commenter: "",
    comment: "",
    image: "",
  });
  const [localstoragedetails, setlocalstoragedetails] = useState(
    JSON.parse(window.localStorage.getItem(id)) || []
  );
  const generator = new AvatarGenerator();

  function handleComments(e) {
    const newObj = { ...addComment };
    newObj[e.target.id] = e.target.value;
    setAddComment(newObj);
  }

  function handleDeleteComment(e, index) {
    localstoragedetails.splice(index, 1);
    setlocalstoragedetails([...localstoragedetails]);
    localStorage.setItem(id, JSON.stringify(localstoragedetails));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userimage = generator.generateRandomAvatar();
    console.log(userimage);
    const newComments = [
      ...localstoragedetails,
      { ...addComment, image: userimage },
    ];
    window.localStorage.setItem(id, JSON.stringify(newComments));
    setlocalstoragedetails(newComments);
    setAddComment({ commenter: "", comment: "" });
  }

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
        {localstoragedetails.map((comment, index) => {
          return (
            <li key={index} className="user-comment">
              <h3>
                <img className="avatar" src={comment.image} alt="avatar" />{" "}
                {comment.commenter}
              </h3>
              <p className="comment">{comment.comment}</p>
              <LikeDislike />
              <button
                onClick={(e) => handleDeleteComment(e, index)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;
