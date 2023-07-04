import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as ReviewActions from "../../store/reviews";
import "./DeleteReview.css";

const DeleteReviewModal = ({ recipeId, reviewId, refreshKey }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const recipes = useSelector((state) => state.recipes);
    const reviews = useSelector((state) => state.reviews);

    const deleteReview = async (e) => {
        if (reviewId.length > 0) {
            const currentRecipeReview = recipes.find((recipe) => recipe.id === reviewId)
            await dispatch(ReviewActions.deleteReviewThunk(recipeId, reviewId));
            history.push(`/recipes/${recipeId}`);
        }
    }
    const handleNoClick = () => {
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={deleteReview}>Yes</button>
            <button onClick={handleNoClick}>No</button>
        </div>
    )
}

export default DeleteReviewModal
