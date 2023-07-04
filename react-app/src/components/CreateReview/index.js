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
        <></>
    )

}

export default CreateReviewModal;
