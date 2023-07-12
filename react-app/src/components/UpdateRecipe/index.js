import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as RecipeActions from "../../store/recipes";
import { csrfFetch } from "../../store/csrf";

import "./UpdateRecipe.css";

const initialIngredient = {
    name: "",
    quantity: 0,
    measurement: "",
    isSeasoning: false,
}

const initialDirection = {
    step: 0,
    stepInfo: "",
}

function UpdateRecipe() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState(null)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([initialIngredient]);
    const [directions, setDirections] = useState([initialDirection]);
    const [prepHours, setPrepHours] = useState(null);
    const [prepMinutes, setPrepMinutes] = useState(null);
    const [cookHours, setCookHours] = useState(null);
    const [cookMinutes, setCookMinutes] = useState(null);

    const [servings, setServings] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [recipeImage, setRecipeImage] = useState(null);
    const [otherImages, setOtherImages] = useState([]);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function getRecipeThunk() {
            const res = await csrfFetch(`/api/recipes/${recipeId}`);
            if (res.ok) {
                const recipe = await res.json()
                setRecipe(recipe)
                setName(recipe.name)
                setDescription(recipe.description)
                setIngredients(recipe.ingredients)
                setDirections(recipe.directions)

                const totalPrepTime = recipe.prepTime
                setPrepHours(Math.floor(totalPrepTime / 60));
                setPrepMinutes(totalPrepTime % 60);
                const totalCookTime = recipe.cookTime;
                setCookHours(Math.floor(totalCookTime / 60));
                setCookMinutes(totalCookTime % 60);

                setServings(recipe.servings)
                setPreviewImage(recipe.image)
                setRecipeImage(recipe.image)
            }
        }
        getRecipeThunk();
    }, [recipeId])

    function handleIngredientChange(i, event) {
        const { name, value, type, checked } = event.target

        const values = [...ingredients];
        // values[i][event.target.name] = event.target.value
        if (type === 'checkbox') {
            // values[i][name] = checked
            values[i] = {
                ...values[i],
                [name]: checked,
            }
        }
        else {
            // values[i][name] = value
            values[i] = {
                ...values[i],
                [name]: value
            }
        }
        setIngredients(values)
    }
    function handleAddIngredient() {
        setIngredients([...ingredients, { ...initialIngredient }])
    }
    function handleRemoveIngredient(i) {
        const values = [...ingredients];
        values.splice(i, 1);
        setIngredients(values)
    }

    function handleDirectionChange(i, event) {
        const { name, value } = event.target

        const values = [...directions];
        // values[i][name] = value
        // values[i][event.target.name] = event.target.value
        values[i] = {
            ...values[i],
            [name]: value,
        }
        setDirections(values)
    }
    function handleAdddirection() {
        setDirections([...directions, { ...initialDirection }])
    }
    function handleRemoveDirection(i) {
        const values = [...directions];
        values.splice(i, 1);
        setDirections(values)
    }

    const handleOtherImages = (e) => {
        if (e.target.files.length > 3) {
            alert("You can only upload a maximum of 3 files");
            e.target.value = "";
        } else {
            setOtherImages([...e.target.files]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const formData = new FormData()
        const totalPrepTime = (parseInt(prepHours) || 0) * 60 + (parseInt(prepMinutes) || 0);
        const totalCookTime = (parseInt(cookHours) || 0) * 60 + (parseInt(cookMinutes) || 0);


        formData.append("name", name)
        formData.append("description", description)
        formData.append("prep_time", totalPrepTime)
        formData.append("cook_time", totalCookTime)
        formData.append("servings", servings)
        formData.append('preview_image', previewImage)
        // formData.append('recipe_image', recipeImage)
        otherImages.forEach((image, index) => {
            formData.append(`other_images[${index}]`, image)
        })

        ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}].name`, ingredient.name)
            formData.append(`ingredients[${index}].quantity`, ingredient.quantity)
            formData.append(`ingredients[${index}].measurement`, ingredient.measurement)
            formData.append(`ingredients[${index}].is_seasoning`, ingredient.isSeasoning)
        })

        directions.forEach((direction, index) => {
            formData.append(`directions[${index}].step`, direction.step)
            formData.append(`directions[${index}].step_info`, direction.stepInfo)
        })

        // fetch(`/api/recipes/${id}`, {
        //     method: "PATCH",
        //     body: formData
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error(error))

        const payload = {
            name: name,
            description: description,
            ingredients: ingredients,
            directions: directions,
            prepHours: prepHours,
            prepMinutes: prepMinutes,
            cookHours: cookHours,
            cookMinutes: cookMinutes,
            // prepTime: prepTime,
            // cookTime: cookTime,
            servings: servings,
            previewImage: previewImage,
            recipeImage: recipeImage
        }

        const updatedRecipe = await dispatch(RecipeActions.updateRecipeThunk(recipeId, payload));

        if (updatedRecipe) {
            history.push(`/recipes/${updatedRecipe.id}`);
        }
    }

    return (
        <div id="update-recipe-container">
            <div className="update-recipe-form">
                <h2 id="update-recipe-title">Update Recipe</h2>
                <h3>What is the name of your recipe?</h3>
            </div>
            <form className='form' onSubmit={handleSubmit}>
                <div id='form-container' className='form-input'>
                    <input
                        id='recipe-name-input'
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Recipe Name'
                        required
                        style={({
                            width: "98%",
                            backgroundColor: "#e2e2e2",
                        })}
                    />
                </div>
                <h2 id='ingredient-title'>Ingredients</h2>
                <h3 id="ingredient-subtitle">What ingredients will we need?</h3>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className='ingredient-input'>
                        <input
                            type='text'
                            name='name'
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, e)}
                            placeholder='Ingredient Name'
                            required={index === 0}
                        />
                        <input
                            type='number'
                            name='quantity'
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(index, e)}
                            placeholder='Quantity'
                            required={index === 0}
                            min='0'
                            step='0.01'
                        />
                        <select
                            name='measurement'
                            value={ingredient.measurement}
                            required={index === 0}
                            onChange={(e) => handleIngredientChange(index, e)}
                        >
                            <option value='cup'>Cup</option>
                            <option value='oz'>Oz</option>
                            <option value='ml'>Ml</option>
                            <option value='tbsp'>Tbsp</option>
                            <option value='tsp'>Tsp</option>
                            <option value='g'>G</option>
                            <option value='lb'>Lb</option>

                        </select>
                        <label>
                            <input
                                type='checkbox'
                                name='isSeasoning'
                                checked={ingredient.isSeasoning}
                                onChange={(e) => handleIngredientChange(index, e)}
                            />
                            Seasoning
                        </label>
                        {ingredients.length > 1 && (
                            <button type='button' onClick={() => handleRemoveIngredient(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type='button' onClick={handleAddIngredient} className='add-button'>
                    <i class="fas fa-plus"></i>
                    <span>Add Ingredient</span>
                </button>
                <h2>Directions</h2>
                <h3>How will we make this recipe?</h3>
                {directions.map((direction, index) => (
                    <div key={index} className='direction-input'>
                        <input
                            type='text'
                            name='step'
                            value={`Step ${direction.step}`}
                            readOnly
                        />
                        <input
                            type='text'
                            name='stepInfo'
                            value={direction.stepInfo}
                            onChange={(e) => handleDirectionChange(index, e)}
                            required
                            placeholder='Step Info'
                        />
                        {directions.length > 1 && (
                            <button type='button' onClick={() => handleRemoveDirection(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAdddirection} className='add-button'>
                    <i class="fas fa-plus"></i>
                    <span>Add Direction</span>
                </button>
                <h2>Time to Cook</h2>
                <h3>How long will this take to cook?</h3>
                <h4>Prep time:</h4>
                <select
                    name='hours'
                    value={prepHours || ''}
                    onChange={(e) => setPrepHours(e.target.value || null)}
                >
                    {[...Array(169).keys()].map((i) =>
                        <option key={i} value={i}>{i} Hours</option>
                    )}
                </select>
                <select
                    name='minutes'
                    value={prepMinutes || ''}
                    onChange={(e) => setPrepMinutes(e.target.value || null)}
                    required
                >
                    {Array.from({ length: 60 }, (_, i) => i + 1).map((i) =>
                        <option key={i} value={i}>{i} Minutes</option>
                    )}
                </select>

                <h4>Cook time:</h4>
                <select
                    name='hours'
                    value={cookHours || ''}
                    onChange={(e) => setCookHours(e.target.value || null)}
                >
                    {[...Array(169).keys()].map((i) =>
                        <option key={i} value={i}>{i} Hours</option>
                    )}
                </select>
                <select
                    name='minutes'
                    value={cookMinutes || ''}
                    onChange={(e) => setCookMinutes(e.target.value || null)}
                    required
                >
                    {Array.from({ length: 60 }, (_, i) => i + 1).map((i) =>
                        <option key={i} value={i}>{i} Minutes</option>
                    )}
                </select>
                <h4>Servings:</h4>
                <select
                    type="number"
                    name='servings'
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                >
                    {[...Array(101).keys()].map((i) =>
                        <option key={i} value={i}>{i} Servings</option>
                    )}
                </select>
                <h2>Description</h2>
                <h3>What is it about this recipe?</h3>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    placeholder='Description'>
                </textarea>
                <h2>Images</h2>
                <h3>What will this recipe look like?</h3>
                <h4>Main Image</h4>
                <input
                    type="file"
                    onChange={(e) => setPreviewImage(e.target.files[0])}
                    required
                >
                </input>
                <h4>Other Images</h4>
                <input
                    type="file"
                    multiple
                    onChange={handleOtherImages}
                >
                </input>
                <div id="form-submit-button">
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Update Recipe
                    </button>
                </div>
            </form>
        </div>
    );


}

export default UpdateRecipe
