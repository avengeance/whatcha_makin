import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";

import * as RecipeActions from "../../store/recipes";
import OpenModalButton from "../OpenModalButton";
import UpdateRecipe from "../UpdateRecipe";
import DeleteRecipeModal from "../DeleteRecipe";

import "./UserRecipe.css";

const UserRecipes = () => {
  const dispatch = useDispatch();
  const tooltipRef = useRef();
  const { closeModal } = useModal();

  const user = useSelector((state) => state.session.user);
  const currentRecipes = useSelector((state) => state.recipes.recipes);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const avgRating = currentRecipes?.avg_rating || 0;

  const [recipes, setRecipes] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const incrementRefreshKey = () => setRefreshKey((prevKey) => prevKey + 1);

  useEffect(() => {
    const getUserRecipes = async () => {
      const response = await dispatch(
        RecipeActions.getRecipesByUserThunk(user.id)
      );
      setRecipes(response["User Recipes"]);
    };
    if (user) {
      getUserRecipes();
    }
  }, [dispatch, user, refreshKey]);

  return (
    <div className="recipe-tile-container">
      {recipes.map((recipe, index) => {
        return (
          <div
            className="recipe-tile"
            key={recipe.id}
            style={{ "--card-index": index }}
            onClick={() => (window.location.href = `/recipes/${recipe.id}`)}
          >
            <div title={recipe.name}>
              <div className="recipe-review-likes-container">
                <div id="recipe-name">{recipe.name}</div>
              </div>
            </div>
            <img
              src={recipe.preview_image[0].url}
              alt={recipe.name}
              id="recipe-tile-image"
            />
            <div className="recipe-buttons">
              <div className="update-button">
                <Link to={`/recipes/${recipe.id}/edit`}>
                  <button type="button">Update</button>
                </Link>
              </div>
              <div
                className="delete-button modal-style"
                onClick={(e) => e.stopPropagation()}
              >
                <OpenModalButton
                  type="button"
                  buttonText={"Delete Recipe"}
                  // style={{
                  //   backgroundColor: "transparent",
                  //   border: "none",
                  // }}
                  modalComponent={
                    <DeleteRecipeModal
                      recipeId={recipe.id}
                      ownerId={user.id}
                      closeModal={closeModal}
                      refreshKey={refreshKey}
                      setRefreshKey={setRefreshKey}
                    />
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserRecipes;
