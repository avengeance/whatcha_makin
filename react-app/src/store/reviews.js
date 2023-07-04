import { csrfFetch } from "./csrf";

// Constants
const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// Actions
const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
        reviews,
})
const createReview = (review) => ({
    type: CREATE_REVIEW,
        review,
})
const updateReview = (review) => ({
    type: UPDATE_REVIEW,
        review,
})
const deleteReview = (review) => ({
    type: DELETE_REVIEW,
        review,
});

// Thunks
export const getAllReviewsThunk = (recipedId) => async (dispatch) => {
    const res = await csrfFetch("/api/recipes/{$recipeId}/reviews",{
        method: "GET",
    });
    const data = await res.json();
    dispatch(getAllReviews(data))
    return data
}

export const createReviewThunk = (recipeId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/reviews/new`, {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    dispatch(createReview(data));
    return data;
}
