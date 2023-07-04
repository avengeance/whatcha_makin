import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as RecipeActions from './store/recipes';
import "./DeleteRecipe.css"

const DeleteRecipeModal = ({ recipeId, ownerId, closeModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteRecipe = async (e) => {
        await dispatch(RecipeActions.deleteRecipeThunk(recipeId));
        closeModal();
        history.push(`/users/${ownerId}/recipes`);
    }

    const handleNoClick = () => {
        closeModal();
    }

    return (
        <div className="delete-modal">
            <h3>Are you sure you want to delete this recipe?</h3>
            <button onClick={deleteRecipe}>Yes</button>
            <button onClick={handleNoClick}>No</button>
        </div>
    )
}

export default DeleteRecipeModal
