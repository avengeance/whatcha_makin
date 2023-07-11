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
const getReview = (reviews) => ({
    type: GET_REVIEW,
    reviews,
})
const createReview = (reviews) => ({
    type: CREATE_REVIEW,
    reviews,
})
const updateReview = (reviews) => ({
    type: UPDATE_REVIEW,
    reviews,
})
const deleteReview = (reviews) => ({
    type: DELETE_REVIEW,
    reviews,
});

// Thunks
export const getAllReviewsThunk = (recipeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/reviews`, {
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

export const updateReviewThunk = (recipeId,payload, reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await res.json();
    dispatch(updateReview(data));
    return data
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/reviews/${reviewId}/delete`, { method: "DELETE" });
        if (!res.ok) throw res;
        const data = await res.json();
        console.log("server response:", data);
        dispatch(deleteReview(data));
        return data;
    } catch (error) {
        console.error("Failed to delete review:", error);
        throw error;
    }
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
            console.log("Deleting review:", action.reviews.id)
            delete newState.reviews[action.reviews.id]
            return newState
        default:
            return state;
    }
}

export default reviewsReducer;
