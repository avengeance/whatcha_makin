import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';

import * as RecipeActions from '../../store/recipes';
import "./DeleteRecipe.css"

const DeleteRecipeModal = ({ recipeId, ownerId, closeModal, refreshKey, setRefreshKey }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { closeModal } = useModal()

    const deleteRecipe = async (e) => {
        e.preventDefault()
        await dispatch(RecipeActions.deleteRecipeThunk(recipeId));
        setRefreshKey()
        closeModal();
        history.push(`/users/${ownerId}/recipes`);
    }

    const handleNoClick = () => {
        closeModal();
    }

    return (
        <div className="delete-modal">
            <h3>Are you sure you want to delete this recipe?</h3>
            <button type='button' onClick={deleteRecipe}>Yes</button>
            <button type='button' onClick={handleNoClick}>No</button>
        </div>
    )
}

export default DeleteRecipeModal
