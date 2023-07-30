import { csrfFetch } from "./csrf";

// Constants
const GET_LIKES_BY_RECIPE = "likes/GET_LIKES_BY_RECIPE";
const CREATE_RECIPE_LIKE = "likes/CREATE_RECIPE_LIKE";
const DELETE_RECIPE_LIKE = "likes/DELETE_RECIPE_LIKE";

// Actions
const getLikesByRecipe = (likes) => ({
  type: GET_LIKES_BY_RECIPE,
  likes,
});
const createRecipeLike = (like) => ({
  type: CREATE_RECIPE_LIKE,
  like,
});
const deleteRecipeLike = (like) => ({
  type: DELETE_RECIPE_LIKE,
  like,
});

// Thunks
export const getLikesByRecipeThunk = (recipeId) => async (dispatch) => {
  const res = await csrfFetch(`/api/recipes/${recipeId}/likes`, {
    method: "GET",
  });
  const data = await res.json();
  dispatch(getLikesByRecipe(data));
  return data;
};

export const createRecipeLikeThunk = (recipeId) => async (dispatch) => {
  const res = await csrfFetch(`/api/recipes/${recipeId}/likes/new`, {
    method: "POST",
  });
  const data = await res.json();
  dispatch(createRecipeLike(data));
  return data;
};

export const deleteRecipeLikeThunk = (recipeId, likeId) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/recipes/${recipeId}/likes/${likeId}/delete`,
    {
      method: "DELETE",
    }
  );
  const data = await res.json();
  dispatch(deleteRecipeLike(data));
  return data;
};

// Reducer
const intialState = {
  likes: {},
};

const likesReducer = (state = intialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_LIKES_BY_RECIPE:
      action.likes.forEach((like) => {
        newState.likes[like.id] = like;
      });
      return newState;
    case CREATE_RECIPE_LIKE:
      newState.likes[action.like.id] = action.likes;
      return newState;
    case DELETE_RECIPE_LIKE:
      delete newState.likes[action.like.id];
      return newState;
    default:
      return state;
  }
};

export default likesReducer;
