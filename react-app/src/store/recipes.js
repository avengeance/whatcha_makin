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
    let recipes = {}
    data.Recipes.forEach(recipe => {
        recipes[recipe.id] = recipe
    })
    dispatch(getAllRecipes(recipes))
    return data
}

export const getRecipeThunk = (recipeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${id}`, {
        method: "GET",
    });
    const recipeDetails = await res.json();
    dispatch(getRecipe(recipeDetails));
    return recipeDetails;
}

export const createRecipeThunk = (recipe) => async (dispatch) => {
    const res = await csrfFetch("/api/recipes/new", {
        method: "POST",
        body: JSON.stringify(recipe),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    dispatch(createRecipe(data));
    return data;
}

export const updateRecipeThunk = (recipe) => async (dispatch) => {
    const res = await csrfFetch(`/api/recipes/${recipe.id}/edit`, {
        method: "PUT",
        body: JSON.stringify(recipe),
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (res.ok){
        const data = await res.json();
        dispatch(updateRecipe(data));
        return data;
    }
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
            action.songs.Songs.forEach((recipe)=>{
                newState.recipes[recipe.id]= recipe
            })
            return newState
        case GET_RECIPE:
            newState.recipes[action.recipes.recipe.id] = action.recipes
            return newState
        case CREATE_RECIPE:
            newState.recipes[action.recipe.id] = action.recipes
            return newState
        case UPDATE_RECIPE:
            newState.recipes[action.recipe.id] = action.recipes
            return newState
        case DELETE_RECIPE:
            const { [action.recipes.id]: deletedRecipe, ...updatedRecipes } = newState.recipes
            return newState
        case GET_RECIPES_BY_USER:
            if (!newState.recipes.user) newState.recipes.user = {}
            bindActionCreators.recipes.UserRecipes.forEach((recipe)=>{
                newState.recipes.user[recipe.id] = recipe
            })
            return newState
        default:
            return state;
    }
}

export default recipesReducer