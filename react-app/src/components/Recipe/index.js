import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as RecipeActions from "../../store/recipes"
import "./Recipe.css";

function Recipe(){
    const dispatch = useDispatch();
    const history = useHistory();
    const recipes = useSelector((state) => Object.values(state.recipes.recipes));

    useEffect(() => {
        dispatch(RecipeActions.getAllRecipesThunk());
    }, [dispatch]);

    const handleRecipeClick = (recipeId) => {
        history.push(`/recipes/${recipeId}`);
    }
    return (
        <></>
    )
}

export default Recipe
