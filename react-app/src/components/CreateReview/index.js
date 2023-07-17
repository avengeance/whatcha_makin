import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as ReviewActions from "../../store/reviews";

import "./CreateReview.css";

function CreateReviewModal({ recipeId, onReviewSubmit }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const currentRecipe = useSelector((state) => state.recipes.recipes);

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
                        // className={i <= stars ? "active" : "inactive"}
                        onClick={() => handleStarClick(i)}>
                        {/* <i class="fas fa-star"></i> */}
                        <i className={`fas fa-star modal-star ${i <= stars ? "active" : ""}`}></i>
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


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        if (!recipeId) {
            console.log('recipeId is missing')
            return
        }
        if (validReview){
            // try {
                setErrors([])
                return dispatch(ReviewActions.createReviewThunk(recipeId, review, stars))
                    .then(onReviewSubmit())
                    .then(closeModal())
                    .then(setRefreshKey(refreshKey + 1))
                    .then(history.push(`/recipes/${recipeId}`))
                    .catch(async (res) =>{
                        const data = await res.json()
                        console.log("This is errors", data.errors)
                        if (data && data.errors) {
                            setErrors(data.errors)
                            console.log("this is errors in conditional:", errors)
                            return
                        }
                    })
            // } catch (error) {
                // setErrors([...errors, error.message]);
                // setErrors((prevErrors) => [...prevErrors, error.message]);
            }
        // }else{
            return setErrors([`Review must be at least ${MIN_REVIEW_LENGTH} characters long.`])
        // }
    }

    return (
        <div className="create-review-modal">
            <div className="modal-backdrop" onClick={closeModal} />
            <div className="modal">
                <h1 id="modal-title">How was this recipe?</h1>
                <form onSubmit={handleSubmit}>
                    {/* {errors.length > 0 && (
                        <ul className="error">
                            {errors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                            {!validReview && (
                            <li>Review must be at least {MIN_REVIEW_LENGTH} characters long</li>
                            )}
                        </ul>
                    )} */}
                    {errors.length > 0 && (
                    <ul>
                    {Object.values(errors).map((error, idx) => {
                     return (
                    <li className='errors' key={idx}>{error}</li>)})}
                    </ul>
                    )}

                    <div id="review-stars-container">
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
                    </div>
                    <div className="modal-button">
                        <button
                            type="submit"
                            id="submit-modal-button"
                            className="submit-button"
                            disabled={!validReview}
                        >
                            Submit Your Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default CreateReviewModal;
