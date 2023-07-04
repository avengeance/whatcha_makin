import { csrfFetch } from "./csrf";

// Constants
const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS";
const GET_REVIEW = "reviews/GET_REVIEW";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// Actions
const getAllReviews = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews,
})
const getReview = (review) => ({
    type: GET_REVIEW,
    review,
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
    const res = await csrfFetch("/api/recipes/{$recipeId}/reviews", {
        method: "GET",
    });
    const data = await res.json();
    dispatch(getAllReviews(data))
    return data
}

export const getReviewThunk = (recipeId, reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/reviews/${reviewId}`, {
        method: "GET",
    });
    const data = await res.json();
    dispatch(getReview(data))
    return data
}

export const createReviewThunk = (recipeId, review, stars) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/reviews/new`, {
        method: "POST",
        body: JSON.stringify({ review, stars }),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    dispatch(createReview(data));
    return data;
}

export const updateReviewThunk = (recipeId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/reviews/${review.id}`, {
        method: "PUT",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await res.json();
    dispatch(updateReview(data));
    return data
}

export const deleteReviewThunk = (recipeId, reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/reviews/${reviewId}/delete`, {
        method: "DELETE",
    })
    const data = await res.json();
    dispatch(deleteReview(data));
    return data
}

// Reducer
const initialState = {
    reviews: []
}

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_REVIEWS:
            action.reviews.forEach((review) => {
                newState.reviews[review.id] = review;
            });
            return newState;
        case GET_REVIEW:
            newState.reviews[action.recipes.review.id] = action.recipes.review;
        case CREATE_REVIEW:
            newState.reviews.push(action.reviews)
            return newState;
        case UPDATE_REVIEW:
            const indexToUpdate = newState.reviews.findIndex((review) => review.id === action.reviews.id);
            if (indexToUpdate !== -1) {
                newState.reviews[indexToUpdate] = action.reviews;
            }
            return newState
        case DELETE_REVIEW:
            delete newState[action.reviews.id]
            return newState
        default:
            return state;
    }
}

export default reviewsReducer;
