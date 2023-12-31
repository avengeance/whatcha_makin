import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Recipe.css";

function Recipe() {
  const tooltipRef = useRef();
  const recipeRating = useSelector((state) => state.recipes.recipes);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        const recipeArray = data.recipes;
        setRecipes(recipeArray);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="recipe-tile-container">
      {recipes.map((recipe, index) => {
        const recipeDetails = recipeRating[recipe.id];
        return (
          <div
            className="recipe-tile"
            key={recipe.id}
            style={{ "--card-index": index }}
            onClick={() => (window.location.href = `/recipes/${recipe.id}`)}
          >
            <div title={recipe.name}>
              <div className="recipe-review-likes-container">
                <div className="recipe-review-likes">
                  <div id="recipe-name">{recipe.name}</div>
                  <div id="avgRating">
                    <i className="fas fa-star"></i>
                    {recipeDetails?.avg_rating &&
                    !isNaN(recipeDetails.avg_rating)
                      ? parseFloat(recipeDetails.avg_rating).toFixed(1)
                      : "New"}
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
                </div>
              </div>
            </div>
            <img
              src={recipe.preview_image[0].url}
              alt={recipe.name}
              id="recipe-tile-image"
            />
          </div>
        );
      })}
    </div>
  );
}

export default Recipe;
