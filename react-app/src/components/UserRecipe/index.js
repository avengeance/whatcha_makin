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
    <div className="user-container">
      {recipes.map((recipe) => (
        <div id="recipe-tile" key={recipe.id}>
          <div className="recipe-tile-container-box">
            <div className="recipe-tile-image">
              <Link to={`/recipes/${recipe.id}`}>
                <img
                  src={recipe.preview_image[0].url}
                  alt={recipe.name}
                  id="recipe-tile-image"
                />
              </Link>
            </div>
          </div>
          <div title={recipe.name}>
            <div className="recipe-review-likes-container">
              <div id="recipe-name">{recipe.name}</div>
              {/* <div className="recipe-review-likes">
                <div id="avgRating">
                  <i className="fas fa-star"></i>
                  {currentRecipes ? (
                    <div>{currentRecipes.avg_rating}</div>
                  ) : (
                    "Loading..."
                  )}
                </div>
                <div id="likes">
                  {recipe.likes > 0 ? (
                    <>
                      <i className="fa-solid fa-heart"></i> {recipe.likes}{" "}
                    </>
                  ) : (
                    <>
                      <i className="far fa-heart"></i> New
                    </>
                  )}
                </div>
              </div> */}
            </div>
            <div className="recipe-buttons">
              <div className="update-button">
                <Link to={`/recipes/${recipe.id}/edit`}>
                  <button type="button">Update</button>
                </Link>
              </div>
              <div className="delete-button">
                <OpenModalButton
                  type="button"
                  buttonText={"Delete Recipe"}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
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
        </div>
      ))}
    </div>
  );
};

export default UserRecipes;
