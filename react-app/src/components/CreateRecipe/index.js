import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as RecipeActions from "../../store/recipes";
// import { createRecipeThunk } from "../../store/recipes";
import IngredientForm from "../IngredientForm";
import DirectionForm from "../DirectionForm";
import { csrfFetch } from "../../store/csrf";

import stockLogo from "../../images/StockLogo.png"
// import smallPhoto from "../../images/smallPhoto.png"

import "./CreateRecipe.css";

const initialIngredient = {
    name: "",
    quantity: 0,
    measurement: "",
    is_seasoning: false,
}
const initialDirection = {
    step: 1,
    step_info: "",
}

function CreateRecipe() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const { recipeId } = useParams()

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([initialIngredient]);
    const [directions, setDirections] = useState([initialDirection]);

    const [prepHours, setPrepHours] = useState(null);
    const [prepMinutes, setPrepMinutes] = useState(null);
    const [cookHours, setCookHours] = useState(null);
    const [cookMinutes, setCookMinutes] = useState(null);

    const [servings, setServings] = useState(1);
    // const [previewImage, setPreviewImage] = useState(null);
    // const [recipeImage, setRecipeImage] = useState(null);
    // const [otherImages, setOtherImages] = useState([]);

    const [errors, setErrors] = useState({});
    const [csrfToken, setCsrfToken] = useState("")

    useEffect(() => {
        const getCookie = (name) => {
            const value = "; " + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        let csrf_token = getCookie('csrf_token');
        setCsrfToken(csrf_token);

    }, []);



    function handleIngredientChange(i, event) {
        const values = [...ingredients];
        if (event.target.name === 'is_seasoning') {
            values[i][event.target.name] = event.target.checked;
        } else {
            values[i][event.target.name] = event.target.value;
        }
        setIngredients(values);
    }

    function handleAddIngredient() {
        setIngredients([...ingredients, { name: '', quantity: 0, measurement: '', is_seasoning: false }])
    }

    function handleRemoveIngredient(i) {
        const values = [...ingredients];
        values.splice(i, 1);
        setIngredients(values)
    }

    function handleDirectionChange(i, event) {
        const values = [...directions];
        values[i][event.target.name] = event.target.value
        setDirections(values)
    }
    function handleAdddirection() {
        const newStep = directions.length + 1
        setDirections([...directions, { step: newStep, step_info: "" }])
    }
    function handleRemoveDirection(i) {
        const values = [...directions];
        values.splice(i, 1);
        setDirections(values)
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
        setErrors({})

        const formData = new FormData()
        const totalPrepTime = (parseInt(prepHours) || 0) * 60 + (parseInt(prepMinutes) || 0);
        const totalCookTime = (parseInt(cookHours) || 0) * 60 + (parseInt(cookMinutes) || 0);

        formData.append('csrf_token', csrfToken)
        formData.append('owner_id', user.id)
        formData.append("name", name)
        formData.append("description", description)
        formData.append("prep_time", totalPrepTime)
        formData.append("cook_time", totalCookTime)
        formData.append("servings", servings)

        // formData.append("preview_image",JSON.stringify(stockLogo))
        // formData.append('preview_image', previewImage)
        // // formData.append('recipe_image', recipeImage)
        // otherImages.forEach((image, index) => {
        //     formData.append(`other_images[${index}]`, image)
        // })

        formData.append('ingredients', JSON.stringify(ingredients))
        formData.append('directions', JSON.stringify(directions))



        let newRecipe;

        try {
            const recipe = await dispatch(RecipeActions.createRecipeThunk(formData))
            const newRecipeId = recipe.id
            const url = `/recipes/${newRecipeId}`
            if (recipe) {
                newRecipe = recipe
                setName('')
                setDescription('')
                setIngredients([initialIngredient])
                setDirections([initialDirection])
                setPrepHours('')
                setPrepMinutes('')
                setCookHours('')
                setCookMinutes('')
                setServings('')
                // setPreviewImage('')
                // setOtherImages([])
                setErrors([])
                history.push(url)
            }
        } catch (error) {
            console.log("Error in catch block", error)
        }

    }

    return (
        <div id="create-recipe-container">
            <form className='form' onSubmit={handleSubmit}>
            <div className="container">       
            <div className="create-recipe-form">
                <h2 id="create-recipe-title">Create a New Recipe</h2>
                <h3>What is the name of your new recipe?</h3>
            </div>
                <div id='form-container' className='form-input'>
                    <input
                        id='recipe-name-input'
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Recipe Name'
                        required
                        />
                </div>
                        </div>
                        <div className="container">
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
                            <option value='slice'>Slice</option>
                            <option value='Large'>Large</option>
                            <option value='whole'>Whole</option>
                            <option value='sheet'>Sheet</option>
                            <option value='split'>Split</option>
                            <option value='cloves'>Cloves</option>

                        </select>
                        <label>
                            <input
                                type='checkbox'
                                name='is_seasoning'
                                checked={ingredient.is_seasoning}
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
                <div className="increase-button">

                <button type='button' onClick={handleAddIngredient} className='add-button'>
                    <i class="fas fa-plus"></i>
                    <span>Add Ingredient</span>
                </button>
                </div>
                        </div>
                        <div className="container">

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
                            name='step_info'
                            value={direction.step_info}
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
                <div className="increase-button">

                <button type="button" onClick={handleAdddirection} className='add-button'>
                    <i class="fas fa-plus"></i>
                    <span>Add Direction</span>
                </button>
                </div>
                        </div>
                        <div className="container">

                <h2>Time to Cook</h2>
                <h3>How long will this take to cook?</h3>
                <div className='time-container'>
                    <div id="prep-time">
                <h4>Prep time:</h4>
                <div className="time-select">
                <select
                    name='hours'
                    className="time-drop-down"
                    value={prepHours}
                    onChange={(e) => setPrepHours(e.target.value)}
                >
                    {[...Array(169).keys()].map((i) =>
                        <option key={i} value={i}>{i} Hours</option>
                    )}
                </select>
                <select
                    name='minutes'
                    className="time-drop-down"
                    value={prepMinutes}
                    onChange={(e) => setPrepMinutes(e.target.value)}
                    required
                >
                    {Array.from({ length: 60 }, (_, i) => i + 1).map((i) =>
                        <option key={i} value={i}>{i} Minutes</option>
                    )}
                </select>
                </div>
                    </div>
<div id="cook-time">
                <h4>Cook time:</h4>
                <div className="time-select">

                <select
                    name='hours'
                    className="time-drop-down"
                    value={cookHours}
                    onChange={(e) => setCookHours(e.target.value)}
                >
                    {[...Array(169).keys()].map((i) =>
                        <option key={i} value={i}>{i} Hours</option>
                    )}
                </select>
                <select
                    name='minutes'
                    className="time-drop-down"
                    value={cookMinutes}
                    onChange={(e) => setCookMinutes(e.target.value)}
                    required
                >
                    {Array.from({ length: 60 }, (_, i) => i + 1).map((i) =>
                        <option key={i} value={i}>{i} Minutes</option>
                    )}
                </select>
                </div>
                </div>
</div>
<div id="servings">
                <h4>Servings:</h4>
                <div className="time-select">

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
                    placeholder='Description'>
                </textarea>
                </div>
                        </div>
                {/* <h2>Images</h2>
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
                </input> */}
                <div id="form-submit-button">
                    <button
                        type="submit"
                        className="submit-button"
                        onClick={handleSubmit}
                    >
                        Create Recipe
                    </button>
                </div>
            </form >
        </div >
    )
}

export default CreateRecipe
