import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as ReviewActions from "../../store/reviews";
import { csrfFetch } from "../../store/csrf";
import Cookies from "js-cookie";

import "./UpdateReview.css";

const UpdateReviewModal = ({
  recipeId,
  reviewId,
  refreshKey,
  setRefreshKey,
  onReviewSubmit,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [reviewValid, setReviewValid] = useState(true);
  const [errors, setErrors] = useState([]);
  // const [refreshKey, setRefreshKey] = useState(0);
  const { closeModal } = useModal();

  const MIN_REVIEW_LENGTH = 10;
  const validReview = review.length >= MIN_REVIEW_LENGTH;

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

  useEffect(() => {
    async function getReviewData() {
      const reviewData = await dispatch(
        ReviewActions.getReviewThunk(recipeId, reviewId)
      );

      if (reviewData.error) {
        return;
      } else {
        setReview(reviewData.review);
        setStars(reviewData.stars);
      }
    }
    getReviewData();
  }, [dispatch, recipeId, reviewId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviewValid(validReview);

    if (validReview) {
      setErrors([]);
      try {
        await dispatch(
          ReviewActions.updateReviewThunk(reviewId, stars, review)
        );
        setRefreshKey(refreshKey + 1);
        closeModal();
      } catch (err) {
        const data = await err.json();
        if (data && data.errors) setErrors(data.errors);
        else setErrors(["Unexpected error while creating the review."]);
      }
    } else {
      setErrors([`Review must be ${MIN_REVIEW_LENGTH} characters long`]);
    }
    history.push(`/recipes/${recipeId}`);
  };
  return (
    <div className="update-review-modal">
      <div className="modal-backdrop" onClick={closeModal} />
      <div className="modal">
        <h1 id="modal-title">How was this recipe?</h1>
        <form onSubmit={handleSubmit}>
          <div id="modal-container">
            <div className="error-container">
              <ul>
                {errors.map((error, i) => (
                  <li className="errors" key={i}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
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
                Update Your Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateReviewModal;
