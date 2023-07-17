import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as RecipeActions from "../../store/recipes";
import "./DeleteRecipe.css";

const DeleteRecipeModal = ({
  recipeId,
  ownerId,
  closeModal,
  refreshKey,
  setRefreshKey,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { closeModal } = useModal()

  const deleteRecipe = async (e) => {
    e.preventDefault();
    await dispatch(RecipeActions.deleteRecipeThunk(recipeId));
    setRefreshKey();
    closeModal();
    history.push(`/users/${ownerId}/recipes`);
  };

  const handleNoClick = () => {
    closeModal();
  };

  return (
    <div className="delete-modal">
      <h3>Are you sure you want to delete this recipe?</h3>
      <div className="button-div">
        <button
          id="yes-button"
          onClick={deleteRecipe}
          style={{
            backgroundColor: "#C6E08D",
            width: "100px",
            height: "50px",
            borderRadius: "15px",
          }}
        >
          Yes
        </button>
        <button
          id="no-button"
          onClick={handleNoClick}
          style={{
            backgroundColor: "#grey",
            width: "100px",
            height: "50px",
            borderRadius: "15px",
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteRecipeModal;
