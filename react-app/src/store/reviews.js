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
});
const getReview = (review) => ({
  type: GET_REVIEW,
  review,
});
const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});
const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});
const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// Thunks
export const getAllReviewsThunk = (recipeId) => async (dispatch) => {
  const res = await csrfFetch(`/api/recipes/${recipeId}/reviews`, {
    method: "GET",
  });
  const data = await res.json();
  dispatch(getAllReviews(data));
  return data;
};

export const getReviewThunk = (recipeId, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}/`, {
    method: "GET",
  });
  const reviewDetails = await res.json();
  dispatch(getReview(reviewDetails));
  return reviewDetails;
};

export const createReviewThunk =
  (recipeId, review, stars) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/reviews/`, {
      method: "POST",
      body: JSON.stringify({ review, stars }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(createReview(data));
      return null;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const updateReviewThunk =
  (reviewId, stars, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}/`, {
      method: "PUT",
      body: JSON.stringify({
        review: review,
        stars,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(updateReview(data));
      return null;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}/delete`, {
      method: "DELETE",
    });
    if (!res.ok) throw res;
    const data = await res.json();
    dispatch(deleteReview(reviewId));
  } catch (error) {
    throw error;
  }
};

// Reducer
const initialState = {
  reviews: [],
};

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
      return newState;
    case CREATE_REVIEW:
      newState.reviews = action.payload;
      return { ...state, reviews: [...state.reviews, action.review] };
    case UPDATE_REVIEW:
      const { id } = action.review;
      newState.reviews[id] = action.review;
      return newState;
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => {
          if (!review) return true;
          return review.id !== action.reviewId;
        }),
      };
    default:
      return state;
  }
};

export default reviewsReducer;
