import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as ReviewActions from "./store/reviews";
import { csrfFetch } from "../../store/csrf";
import Cookies from "js-cookie";

import "./UpdateReview.css";

const updateReviewModal = ({ recipeId, reviewId, onReviewSubmit }) => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);

    const [errors, setErrors] = useState({});

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

    const onReviewSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const payload = {
            review,
            stars,
        }

        const updatedReview = await ReviewActions.updateReviewThunk(recipeId, reviewId, payload);

        if (updatedReview && !updatedReview.errors) {
            closeModal();
            onReviewSubmit();
            dispatch(ReviewActions.getAllReviewsThunk(recipeId));
            history.push(`/recipes/${recipeId}`);
        } else {
            setErrors(updatedReview.errors);
        }
    }
    return (
        <></>
    )
}

export default updateReviewModal;
