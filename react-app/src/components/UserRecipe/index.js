import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as RecipeActions from "../../store/recipes";
import OpenModalButton from '../OpenModalButton';
import DeleteRecipeModal from '../DeleteRecipe';

import './UserRecipe.css'

const UserRecipes = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const currentRecipe = useSelector((state) => state.recipes.Recipes);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getUserRecipes = async () => {
            const response = await dispatch(RecipeActions.getRecipesByUserThunk(user.id));
            setRecipes(response);
        }
        if (user) {
            getUserRecipes();
        }
    }, [dispatch, user])

    return (
        <></>
    )
}

export default UserRecipes;
