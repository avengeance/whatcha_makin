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
    const res = await csrfFetch(`/api/reviews/${reviewId}/`, {
        method: "GET",
    })
    const reviewDetails = await res.json()
    dispatch(getReview(reviewDetails))
    return reviewDetails
}

export const createReviewThunk = (recipeId, review, stars) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/reviews/`, {
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

export const updateReviewThunk = (reviewId, review, stars) => async (dispatch) => {
    console.log("this is review:", review)
    console.log("this is stars:", stars)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify({ review, stars }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log("this is res:", res)
    const data = await res.json();
    console.log("this is data:", data)
    dispatch(updateReview(data));
    return data
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/reviews/${reviewId}/delete`, { method: "DELETE" });
        if (!res.ok) throw res;
        const data = await res.json();
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
            newState.reviews[action.review.id] = action.review;
            return newState
        case CREATE_REVIEW:
            // newState.reviews.push(action.reviews)
            // return newState;
            newState.reviews = action.payload
            return { ...state, reviews: [...state.reviews, action.review] }
        case UPDATE_REVIEW:
            const indexToUpdate = newState.reviews.findIndex((review) => review.id === action.reviews.id);
            if (indexToUpdate !== -1) {
                newState.reviews[indexToUpdate] = action.review;
            }
            return newState
        case DELETE_REVIEW:
            delete newState.reviews[action.reviews.id]
            // return newState
            return { ...state, reviews: [...state.reviews, action.review] }
        default:
            return state;
    }
}

export default reviewsReducer;
// const initialState = {
//     reviews: []
// };
// const reviewsReducer = (state = initialState, action) => {
//     let newState = { ...state };
//     switch (action.type) {
//         case GET_ALL_REVIEWS:
//             action.reviews.forEach((review) => {
//                 newState.reviews[review.id] = review;
//             });
//             return newState;
//         case GET_REVIEW:
//             newState.reviews[action.review.id] = action.review;
//             return newState;
//         case CREATE_REVIEW:
//             newState.reviews.push(action.review);
//             return newState;
//         case UPDATE_REVIEW:
//             const indexToUpdate = newState.reviews.findIndex(
//                 (review) => review.id === action.review.id
//             );
//             if (indexToUpdate !== -1) {
//                 newState.reviews[indexToUpdate] = action.review;
//             }
//             return newState;
//         case DELETE_REVIEW:
//             newState.reviews = newState.reviews.filter(
//                 (review) => review.id !== action.review.id
//             );
//             return newState;
//         default:
//             return state;
//     }
// };
// export default reviewsReducer;
