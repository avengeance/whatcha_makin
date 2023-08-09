import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as CommentActions from "../../store/comments";
import "./DeleteComment.css";

const DeleteCommentModal = ({
  recipeId,
  commentId,
  refreshKey,
  setRefreshKey,
}) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteComment = async () => {
    await dispatch(CommentActions.deleteCommentThunk(recipeId, commentId));
    // await dispatch(CommentActions.getAllCommentsThunk(recipeId));
    // setRefreshKey(refreshKey + 1);
    closeModal();
    // history.push(`/recipes/${recipeId}`);
  };

  const handleNoClick = () => {
    closeModal();
  };

  return (
    <div className="delete-modal">
      <h3>Are you sure you want to delete this comment?</h3>
      <div className="button-div">
        <button
          id="yes-button"
          onClick={deleteComment}
          style={{
            backgroundColor: "#C6E08D",
            width: "100px",
            height: "50px",
            borderRadius: "15px",
          }}
        >
          Yes
        </button>
        <button
          id="no-button"
          onClick={handleNoClick}
          style={{
            backgroundColor: "#grey",
            width: "100px",
            height: "50px",
            borderRadius: "15px",
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteCommentModal;
