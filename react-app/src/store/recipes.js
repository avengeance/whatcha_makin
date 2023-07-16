import { bindActionCreators } from "redux";
import { csrfFetch } from "../store/csrf";

// Constants
const GET_ALL_RECIPES = 'recipes/GET_ALL_RECIPES';
const GET_RECIPE = 'recipes/GET_RECIPE';
const CREATE_RECIPE = 'recipes/CREATE_RECIPE';
const UPDATE_RECIPE = 'recipes/UPDATE_RECIPE';
const DELETE_RECIPE = 'recipes/DELETE_RECIPE';
const GET_RECIPES_BY_USER = 'recipes/GET_RECIPES_BY_USER';

// Actions
const getAllRecipes = (recipes) => ({
    type: GET_ALL_RECIPES,
    recipes,
})

const getRecipe = (recipe) => ({
    type: GET_RECIPE,
    recipe,
})

const createRecipe = (recipe) => ({
    type: CREATE_RECIPE,
    recipe,
})

const updateRecipe = (recipe) => ({
    type: UPDATE_RECIPE,
    recipe,
})

const deleteRecipe = (recipe) => ({
    type: DELETE_RECIPE,
    recipe,
})

const getRecipesByUser = (recipes) => ({
    type: GET_RECIPES_BY_USER,
    recipes,
})

// Thunks
export const getAllRecipesThunk = () => async (dispatch) => {
    const res = await csrfFetch("/api/recipes", {
        method: "GET",
    });
    const data = await res.json()
    if (res.ok) {
        dispatch(getAllRecipes(data.recipes))
    }
    else {
        throw new Error(data.error)
    }
    return data
}

export const getRecipeThunk = (recipeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}`, {
        method: "GET",
    });
    const recipeDetails = await res.json();
    dispatch(getRecipe(recipeDetails));
    return recipeDetails;
}

export const createRecipeThunk = (formData) => async (dispatch) => {
    const res = await fetch("/api/recipes/new/", {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    // console.log("This is data in thunk:", data)
    dispatch(createRecipe(data));
    return data;
}

export const updateRecipeThunk = (recipeId, formData) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}/edit/`, {
        method: "PUT",
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    console.log("This is thunk formData:", formData)
    const data = await res.json();
    console.log("This is thunk data:",data)
    dispatch(updateRecipe(data));
    return data;
}

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
    })
    const data = await res.json();
    dispatch(deleteRecipe(data));
    return data
}

export const getRecipesByUserThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/recipes`, {
        method: "GET",
    })
    const data = await res.json()
    dispatch(getRecipesByUser(data))
    return data
}

// Reducers
const intialState = {
    recipes: {}
}

const recipesReducer = (state = intialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_RECIPES:

            Object.values(action.recipes).forEach((recipe) => {
                newState.recipes[recipe.id] = recipe
            })
            return newState
        case GET_RECIPE:
            newState.recipes[action.recipe.id] = action.recipe
            return newState
        case CREATE_RECIPE:
            newState.recipes[action.recipe.id] = action.recipe
            return {
                ...state,
                [action.recipe.id]:{
                    ...action.recipe,
                    avg_rating:0
                }
            }
        case UPDATE_RECIPE:
            newState.recipes[action.recipe.id] = action.recipe
            return newState
        case DELETE_RECIPE:
            const { [action.recipe.id]: deletedRecipe, ...updatedRecipes } = newState.recipes;
            newState.recipes = updatedRecipes
            return newState
        case GET_RECIPES_BY_USER:
            if (!newState.recipes.user) newState.recipes.user = {}
            if (action.recipes && action.recipes.UserRecipes) {
                action.recipes.UserRecipes.forEach((recipe) => {
                    newState.recipes.user[recipe.id] = recipe
                })
            }
            return newState
        default:
            return state;
    }
}

export default recipesReducer
