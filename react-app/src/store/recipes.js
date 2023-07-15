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
    // let recipes = {}
    // data.recipes.forEach(recipe => {
    //     recipes[recipe.id] = recipe
    // })
    // dispatch(getAllRecipes(recipes))
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

export const createRecipeThunk = (recipe) => async (dispatch) => {
    const formData = new FormData();
    Object.keys(recipe).forEach((key) => {
        if (Array.isArray(recipe[key])) {
            recipe[key].forEach((item, index) => {
                Object.keys(item).forEach((subKey) => {
                    formData.append(`${key}[${index}].${subKey}`, item[subKey])
                })
            })
        } else {
            formData.append(key, recipe[key])
        }
    })
    const res = await csrfFetch("/api/recipes/new", {
        method: "POST",
        body: formData,
    });
    if (res.ok) {
        const data = await res.json();
        console.log("This is data:", data)
        dispatch(createRecipe(data));
        return data;
    } else {
        return console.log("this is res errors:", res.errors)
    }
}

export const updateRecipeThunk = (recipe, payload) => async (dispatch) => {
    console.log("This is thunk Recipe:", recipe)
    const formData = new FormData();
    Object.keys(recipe).forEach((key) => {
        if (Array.isArray(recipe[key])) {
            recipe[key].forEach((item, index) => {
                Object.keys(item).forEach((subKey) => {
                    formData.append(`${key}[${index}].${subKey}`, item[subKey])
                })
            })
        } else {
            formData.append(key, recipe[key])
        }
    })
    const res = await csrfFetch(`/api/recipes/${recipe}/edit`, {
        method: "PUT",
        body: formData,
    });
    if (res.ok) {
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
            // action.recipes.Recipes.forEach((recipe) => {
            //     newState.recipes[recipe.id] = recipe
            // })
            Object.values(action.recipes).forEach((recipe) => {
                newState.recipes[recipe.id] = recipe
            })
            return newState
        case GET_RECIPE:
            newState.recipes[action.recipe.id] = action.recipe
            return newState
        case CREATE_RECIPE:
            newState.recipes[action.recipe.id] = action.recipes
            return newState
        case UPDATE_RECIPE:
            newState.recipes[action.recipe.id] = action.recipes
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
