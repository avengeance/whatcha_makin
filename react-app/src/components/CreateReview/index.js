import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as ReviewActions from "../../store/reviews";

import "./CreateReview.css";

function CreateReviewModal({ recipeId, onReviewSubmit }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState("");
  const [reviewValid, setReviewValid] = useState(true);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const { closeModal } = useModal();

  const MIN_REVIEW_LENGTH = 10;
  const validReview = review.length >= MIN_REVIEW_LENGTH;
  const validStars = stars > 0;

  function StarRating({ stars, setStars }) {
    const createStars = () => {
      let starArray = [];
      for (let i = 1; i <= 5; i++) {
        starArray.push(
          <span key={i} onClick={() => handleStarClick(i)}>
            <i
              className={`fas fa-star modal-star ${i <= stars ? "active" : ""}`}
            ></i>
          </span>
        );
      }
      return starArray;
    };
    const handleStarClick = (i) => {
      setStars(i);
    };
    return <div className="star-rating">{createStars()}</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviewValid(validReview);

    if (validReview && validStars) {
      setErrors([]);

      try {
        const newReviewId = await dispatch(
          ReviewActions.createReviewThunk(recipeId, review, stars)
        );
        setRefreshKey(refreshKey + 1);
        closeModal();
        onReviewSubmit();
      } catch (err) {
        const data = await err.json();
        if (data && data.errors) setErrors(data.errors);
        else setErrors(["Unexpected error while creating the review."]);
      }
    } else {
      setErrors([
        `Review must be ${MIN_REVIEW_LENGTH} characters long and/or stars need an input`,
      ]);
    }
    history.push(`/recipes/${recipeId}`);
  };

  return (
    <div className="create-review-modal">
      <div className="modal-backdrop" onClick={closeModal} />
      <div className="modal">
        <h1 id="modal-title">How was this recipe?</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className="errors" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          <div id="review-stars-container">
            <label id="review-label">
              <textarea
                placeholder="Leave your review here..."
                onChange={(e) => setReview(e.target.value)}
                type="text"
                id="review-input"
                name="review"
                value={review}
                required
              ></textarea>
            </label>
            <div id="stars">
              <StarRating stars={stars} setStars={setStars} />
            </div>
          </div>
          <div className="modal-button">
            <button
              type="submit"
              id="submit-modal-button"
              className="submit-button"
            >
              Submit Your Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReviewModal;
