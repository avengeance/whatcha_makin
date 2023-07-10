import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as ReviewActions from "../../store/reviews";

import "./CreateReview.css";

function CreateReviewModal({ recipeId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const currentRecipe = useSelector((state) => state.recipes.currentRecipe);

    const { closeModal } = useModal();

    const MIN_REVIEW_LENGTH = 10;
    const validReview = review.length >= MIN_REVIEW_LENGTH

    function StarRating({ stars, setStars }) {
        const createStars = () => {
            let starArray = [];
            for (let i = 1; i <= 5; i++) {
                starArray.push(
                    <span
                        key={i}
                        className={i <= stars ? "active" : "inactive"}
                        onClick={() => handleStarClick(i)}>
                        <i class="fas fa-star"></i>
                    </span>
                )
            }
            return starArray
        }
        const handleStarClick = (i) => {
            setStars(i)
        }
        return <div className="star-rating">{createStars()}</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const data = await (ReviewActions.createReviewThunk(currentRecipe.id, review, stars));
        setReview("");

        if (data && !data.errors) {
            closeModal()
            dispatch(ReviewActions.getAllReviewsThunk(recipeId));
            setRefreshKey(prevKey => prevKey + 1)
        } else if (data.errors) {
            setErrors(data.errors);
        }
    }

    return (
        <div className="create-review-modal">
            <div className="modal-backdrop" onClick={closeModal} />
            <div className="modal">
                <h1 id="modal-title">How was this recipe?</h1>
                <form onSubmit={handleSubmit}>
                    {errors.length > 0 && (
                        <ul className="error">
                            {errors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                            {!validReview && (<li>Review must be at least {MIN_REVIEW_LENGTH} characters long</li>)}
                        </ul>
                    )}
                    <label id="review-label">
                        <textarea
                            placeholder="Leave your review here..."
                            onChange={(e) => setReview(e.target.value)}
                            type="text"
                            id="review-input"
                            name="review"
                            value={review}
                            required></textarea>
                    </label>
                    <div id="stars">
                        <StarRating stars={stars} setStars={setStars} />
                    </div>
                </form>
            </div>
        </div>
    )

}

export default CreateReviewModal;
