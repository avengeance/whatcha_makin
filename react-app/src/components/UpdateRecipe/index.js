import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as RecipeActions from "../../store/recipes";
import * as validators from "../../utils/validations.js";
import { csrfFetch } from "../../store/csrf";

import "./UpdateRecipe.css";

const initialIngredient = {
  name: "",
  quantity: 1,
  measurement: "cup",
  is_seasoning: false,
};

const initialDirection = {
  step: 0,
  step_info: "",
};

function UpdateRecipe() {
  const user = useSelector((state) => state.session.user);
  const currentRecipe = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();
  const history = useHistory();
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([initialIngredient]);
  const [directions, setDirections] = useState([initialDirection]);

  const [prepTime, setPrepTime] = useState(null);
  const [prepHours, setPrepHours] = useState(null);
  const [prepMinutes, setPrepMinutes] = useState(null);

  const [cookTime, setCookTime] = useState(null);
  const [cookHours, setCookHours] = useState(null);
  const [cookMinutes, setCookMinutes] = useState(null);

  const [servings, setServings] = useState("");
  // const [previewImage, setPreviewImage] = useState(null);
  // const [recipeImage, setRecipeImage] = useState(null);
  // const [otherImages, setOtherImages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [stepCounter, setStepCounter] = useState(1);

  const [nameValid, setNameValid] = useState(false);

  const [errors, setErrors] = useState({});

  const onNameChange = (e) => {
    const valid = validators.validateName(e.target.value);
    setNameValid(valid);
    setName(e.target.value);
    if (!valid) {
      setErrors([`Name must be ${validators.MIN_NAME_LENGTH} characters long`]);
    } else {
      setNameValid(valid);
      setName(e.target.value);
    }
  };

  useEffect(() => {
    async function getRecipeThunk() {
      if (!recipeId) {
        return;
      }

      const res = await fetch(`/api/recipes/${recipeId}`);
      if (res.ok) {
        const recipe = await res.json();

        setRecipe(recipe);
        setName(recipe.name || "");
        setDescription(recipe.description || "");
        setIngredients(recipe.ingredients || []);
        setDirections(recipe.directions || []);

        setPrepTime(recipe.prep_time);
        setCookTime(recipe.cook_time);

        const prepHours = Math.floor(recipe.prep_time / 60);
        const prepMinutes = recipe.prep_time % 60;
        setPrepHours(prepHours);
        setPrepMinutes(prepMinutes);

        const cookHours = Math.floor(recipe.cook_time / 60);
        const cookMinutes = recipe.cook_time % 60;
        setCookHours(cookHours);
        setCookMinutes(cookMinutes);

        setServings(recipe.servings || 1);

        setLoading(false);
      }
    }
    getRecipeThunk();
  }, [recipeId]);

  function handleIngredientChange(i, field, value) {
    const values = [...ingredients];
    values[i] = {
      ...values[i],
      [field]: value,
    };
    setIngredients(values);
  }
  function handleAddIngredient() {
    setIngredients([...ingredients, { ...initialIngredient }]);
  }
  function handleRemoveIngredient(i) {
    const values = [...ingredients];
    values.splice(i, 1);
    setIngredients(values);
  }

  function handleDirectionChange(i, event) {
    const { name, value } = event.target;

    const values = [...directions];

    if (name === "step") {
      values[i] = {
        ...values[i],
        step: parseInt(value.replace("Step ", "")),
      };
    } else {
      values[i] = {
        ...values[i],
        step_info: value,
      };
    }

    setDirections(values);
  }
  function handleAddDirection() {
    setDirections((prevDirections) => [
      ...prevDirections,
      {
        step: `${prevDirections.length + 1}`,
        step_info: "",
      },
    ]);
  }
  function handleRemoveDirection(i) {
    setDirections((prevDirections) => {
      const updatedDirections = [...prevDirections];
      updatedDirections.splice(i, 1);
      return updatedDirections.map((direction, i) => ({
        ...direction,
        step: `${i + 1}`,
      }));
    });
  }

  // const handleOtherImages = (e) => {
  //     if (e.target.files.length > 3) {
  //         alert("You can only upload a maximum of 3 files");
  //         e.target.value = "";
  //     } else {
  //         setOtherImages([...e.target.files]);
  //     }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();
    // const totalPrepTime = (parseInt(prepHours) || 0) * 60 + (parseInt(prepMinutes) || 0);
    // const totalCookTime = (parseInt(cookHours) || 0) * 60 + (parseInt(cookMinutes) || 0);
    const totalPrepTime = (prepHours || 0) * 60 + (parseInt(prepMinutes) || 0);
    const totalCookTime = (cookHours || 0) * 60 + (parseInt(cookMinutes) || 0);
    // const totalPrepTime = ((prepHours || 0) * 60 + (prepMinutes || 0));
    // const totalCookTime = ((cookHours || 0) * 60 + (cookMinutes || 0));

    formData.append("name", name);
    formData.append("description", description);
    formData.append("prep_time", totalPrepTime);
    formData.append("cook_time", totalCookTime);
    formData.append("servings", servings);
    // formData.append('preview_image', previewImage)
    // // formData.append('recipe_image', recipeImage)
    // otherImages.forEach((image, index) => {
    //     formData.append(`other_images[${index}]`, image)
    // })
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("directions", JSON.stringify(directions));

    let updatedRecipe;
    try {
      const recipe = await dispatch(
        RecipeActions.updateRecipeThunk(recipeId, formData)
      );
      if (recipe) {
        updatedRecipe = recipe;
        setName("");
        setDescription("");
        setIngredients([initialIngredient]);
        setDirections([initialDirection]);
        // setPrepTime(totalPrepTime)
        // setCookTime(totalCookTime)
        setPrepHours("");
        setPrepMinutes("");
        setCookHours("");
        setCookMinutes("");
        // setServings('')
        // setPreviewImage('')
        // setOtherImages([])
        setErrors([]);
        history.push(`/recipes/${recipe.id}`);
      }
    } catch (error) {
      console.error("There was an error updating the recipe", error);
      setErrors([`Name must be ${validators.MIN_NAME_LENGTH} characters long`]);
    }
    if (updatedRecipe) {
      console.log("Updated recipe", updatedRecipe);
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div id="update-recipe-container">
      <form className="form" onSubmit={handleSubmit}>
        {errors?.length > 0 &&
          errors.map((error) => <p className="errors">{error}</p>)}
        <div className="container">
          <div className="update-recipe-form">
            <h2 id="update-recipe-title">Update Recipe</h2>
            <h3>What is the name of your recipe?</h3>
          </div>
          <div id="form-container" className="form-input">
            <input
              id="recipe-name-input"
              type="text"
              name="name"
              value={name}
              onChange={onNameChange}
              placeholder="Recipe Name"
              required
            />
          </div>
        </div>
        <div className="container">
          <h2 id="ingredient-title">Ingredients</h2>
          <h3 id="ingredient-subtitle">What ingredients will we need?</h3>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                name="name"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                placeholder="Ingredient Name"
                required={index === 0}
              />
              <input
                type="number"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                placeholder="Quantity"
                required={index === 0}
                min="0"
                step="0.01"
              />
              <select
                name="measurement"
                value={ingredient.measurement}
                required={index === 0}
                onChange={(e) =>
                  handleIngredientChange(index, "measurement", e.target.value)
                }
              >
                <option value="cup">Cup</option>
                <option value="oz">Oz</option>
                <option value="ml">Ml</option>
                <option value="tablespoons">Tbsp</option>
                <option value="teaspoons">Tsp</option>
                <option value="g">G</option>
                <option value="lb">Lb</option>
                <option value="large">Large</option>
                <option value="slices">Slices</option>
                <option value="whole">Whole</option>
              </select>
              <label>
                <input
                  type="checkbox"
                  name="is_seasoning"
                  checked={ingredient.is_seasoning}
                  onChange={(e) =>
                    handleIngredientChange(
                      index,
                      "is_seasoning",
                      e.target.checked
                    )
                  }
                />
                Seasoning
              </label>
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className="increase-button">
            <button
              type="button"
              onClick={handleAddIngredient}
              className="add-button"
            >
              <i class="fas fa-plus"></i>
              <span>Add Ingredient</span>
            </button>
          </div>
        </div>
        <div className="container">
          <h2>Directions</h2>
          <h3>How will we make this recipe?</h3>
          {directions.map((direction, index) => (
            <div key={index} className="direction-input">
              <input
                type="text"
                name="step"
                value={`Step ${direction.step}`}
                readOnly
              />
              <input
                type="text"
                name="step_info"
                value={direction.step_info}
                onChange={(e) => handleDirectionChange(index, e)}
                placeholder="Step Info"
                rows={10}
              />
              {directions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDirection(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className="increase-button">
            <button
              type="button"
              onClick={handleAddDirection}
              className="add-button"
            >
              <i class="fas fa-plus"></i>
              <span>Add Direction</span>
            </button>
          </div>
        </div>
        <div className="container">
          <h2>Time to Cook</h2>
          <h3>How long will this take to cook?</h3>
          <div className="time-container">
            <div id="prep-time">
              <h4>Prep time:</h4>
              <div className="time-select">
                <select
                  name="hours"
                  className="time-drop-down"
                  type="number"
                  value={prepHours}
                  // value={prepHours !== null ? prepHours.toString() : ''}
                  onChange={(e) =>
                    setPrepHours(
                      e.target.value !== "" ? parseInt(e.target.value) : null
                    )
                  }
                >
                  {[...Array(169).keys()].map((i) => (
                    <option key={i} value={i}>
                      {i} Hours
                    </option>
                  ))}
                </select>
                <select
                  name="minutes"
                  className="time-drop-down"
                  type="number"
                  value={prepMinutes}
                  // value={prepTime !== null ? prepTime.toString() : ''}
                  onChange={(e) =>
                    setPrepMinutes(
                      e.target.value !== "" ? parseInt(e.target.value) : null
                    )
                  }
                  required
                >
                  {Array.from({ length: 60 }, (_, i) => i + 1).map((i) => (
                    <option key={i} value={i}>
                      {i} Minutes
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div id="cook-time">
              <h4>Cook time:</h4>
              <div className="time-select">
                <select
                  name="hours"
                  className="time-drop-down"
                  type="number"
                  value={cookHours}
                  // value={cookHours !== null ? cookHours.toString() : ''}
                  onChange={(e) =>
                    setCookHours(
                      e.target.value !== "" ? parseInt(e.target.value) : null
                    )
                  }
                >
                  {[...Array(169).keys()].map((i) => (
                    <option key={i} value={i}>
                      {i} Hours
                    </option>
                  ))}
                </select>
                <select
                  name="minutes"
                  className="time-drop-down"
                  type="number"
                  value={cookMinutes}
                  // value={cookTime !== null ? cookTime.toString() : ''}
                  onChange={(e) =>
                    setCookMinutes(
                      e.target.value !== "" ? parseInt(e.target.value) : null
                    )
                  }
                  required
                >
                  {Array.from({ length: 60 }, (_, i) => i + 1).map((i) => (
                    <option key={i} value={i}>
                      {i} Minutes
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div id="servings">
            <h4>Servings:</h4>
            <div className="time-select">
              <select
                type="number"
                name="servings"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              >
                {[...Array(101).keys()].map((i) => (
                  <option key={i} value={i}>
                    {i} Servings
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Description</h2>
          <h3>What is it about this recipe?</h3>
          <div className="textarea-container">
            <textarea
              name="description"
              id="description-text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Description"
            ></textarea>
          </div>
        </div>
        {/* <h2>Images</h2>
                    <h3>What will this recipe look like?</h3>
                    <h4>Main Image</h4>
                    <input
                        type="file"
                        onChange={(e) => setPreviewImage(e.target.files[0])}
                    >
                    </input>
                    <h4>Other Images</h4>
                    <input
                        type="file"
                        multiple
                        onChange={handleOtherImages}
                    >
                    </input> */}
        <div id="form-submit-button">
          <button type="submit" className="submit-button" disabled={!nameValid}>
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateRecipe;
