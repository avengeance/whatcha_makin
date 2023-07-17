import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as ReviewActions from "../../store/reviews";
import "./DeleteReview.css";

const DeleteReviewModal = ({
  recipeId,
  reviewId,
  refreshKey,
  setRefreshKey,
}) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteReview = async () => {
    await dispatch(ReviewActions.deleteReviewThunk(reviewId));
    setRefreshKey(refreshKey + 1);
    closeModal();
    history.push(`/recipes/${recipeId}`);
  };

  const handleNoClick = () => {
    closeModal();
  };

  return (
    <div className="delete-modal">
      <h3>Are you sure you want to delete this review?</h3>
      <div className="button-div">
        <button
          id="yes-button"
          onClick={deleteReview}
          style={{
            backgroundColor: "#C6E08D",
            width: "100px", // specify your desired width
            height: "50px",
            borderRadius: "15px", // specify your desired height
          }}
        >
          Yes
        </button>
        <button
          id="no-button"
          onClick={handleNoClick}
          style={{
            backgroundColor: "#grey",
            width: "100px", // specify your desired width
            height: "50px",
            borderRadius: "15px", // specify your desired height
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
