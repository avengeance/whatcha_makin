import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import PropTypes from "prop-types";

import * as ReviewActions from "./store/reviews";

import "./CreateReview.css";

function CreateReviewModal({ recipeId, onReviewSubmit }) {
    const dispatch = useDispatch();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);

    const [errors, setErrors] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const data = await (ReviewActions.createReviewThunk(recipeId, review, stars));
        setReview("");

        if (data && !data.errors){
            closeModal()
            onReviewSubmit();
            dispatch(ReviewActions.getAllReviewsThunk(recipeId));
            setRefreshKey(prevKey => prevKey +1)
        }else if (data.errors){
            setErrors(data.errors);
        }
    }

    return (
        <></>
    )

    CreateReviewModal.propTypes = {
        recipeId: PropTypes.string.isRequired,
        onReviewSubmit: PropTypes.func.isRequired,
    }
}

export default CreateReviewModal;
