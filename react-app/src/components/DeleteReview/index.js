import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as ReviewActions from "./store/reviews";
import "./DeleteReview.css";

const DeleteReview = ({recipeId, reviewId, refreshKey,setRefreshKey}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteReview = async (e) => {
        await dispatch(ReviewActions.deleteReviewThunk(recipeId, reviewId));
        setReFreshKey(refreshKey +1)
        closeModal()
        history.push(`/recipes/${recipeId}`)
    }
    const handleNoClick = () => {
        closeModal()
    }

    return(
        <div className="delete-modal">
            <h3>Are you sure you want to delete this review?</h3>
            <button onClick={deleteReview}>Yes</button>
            <button onClick={handleNoClick}>No</button>
        </div>
    )
}
