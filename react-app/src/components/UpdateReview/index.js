import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as ReviewActions from "./store/reviews";
import { csrfFetch } from "../../store/csrf";
import Cookies from "js-cookie";

import "./UpdateReview.css";

const updateReviewModal = ({ recipeId, reviewId, onReviewSubmit }) => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const { closeModal } = useModal();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);

    const [errors, setErrors] = useState({});

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

    useEffect(() => {
        async function getReviewThunk() {
            const res = await csrfFetch(`/api/recipes/${id}/reviews/${reviewId}`);
            if (res.ok) {
                const review = await res.json();
                setReview(review);
                setStars(review.stars);
            }
        }
        getReviewThunk();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const payload = {
            review,
            stars,
        }

        const updatedReview = await ReviewActions.updateReviewThunk(recipeId, reviewId, payload);

        if (updatedReview && !updatedReview.errors) {
            closeModal();
            handleSubmit();
            dispatch(ReviewActions.getAllReviewsThunk(recipeId));
            history.push(`/recipes/${recipeId}`);
        } else {
            setErrors(updatedReview.errors);
        }
    }
    return (
        <div className="update-review-modal">
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
            </div></div>
    )
}

export default updateReviewModal;
