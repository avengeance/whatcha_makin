import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as CommentActions from "../../store/comments";
import * as RecipeActions from "../../store/recipes";

import "./CreateComment.css";

function CreateCommentModal({ recipeId, onCommentSubmit }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [commentValid, setCommentValid] = useState(true);
  const [errors, setErrors] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const { closeModal } = useModal();

  const MIN_COMMENT_LENGTH = 10;
  const validComment = comment.length >= MIN_COMMENT_LENGTH;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentValid(validComment);

    if (validComment) {
      setErrors([]);

      try {
        await dispatch(CommentActions.createCommentThunk(recipeId, comment));
        setRefreshKey(refreshKey + 1);
        closeModal();
        onCommentSubmit();
        setComment("");
      } catch (err) {
        const data = await err.json();
        if (data && data.errors) setErrors(data.errors);
        else setErrors(["Unexpected error while creating the comment."]);
      }
    } else {
      setErrors([`Comment must be ${MIN_COMMENT_LENGTH} characters long.`]);
    }
    history.push(`/recipes/${recipeId}`);
  };

  return (
    <div className="create-comment-modal">
      <div className="modal-backdrop" onClick={closeModal} />
      <div className="modal">
        <h1 id="modal-title">What will you like to say?</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className="errors" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <div id="comment-container">
            <label id="comment-label">
              <textarea
                placeholder="Leave your comment here..."
                onChange={(e) => setComment(e.target.value)}
                type="text"
                id="comment-input"
                name="comment"
                value={comment}
                required
              ></textarea>
            </label>
          </div>
          <div className="modal-button">
            <button
              type="submit"
              id="submit-modal-button"
              className="submit-button"
            >
              Submit Your Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCommentModal;
