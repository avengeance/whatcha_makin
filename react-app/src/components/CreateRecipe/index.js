import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as RecipeActions from "../../store/recipes";
import { csrfFetch } from "../../store/csrf";

import "./CreateRecipe.css";

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

function CreateRecipe() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([initialIngredient]);
    const [directions, setDirections] = useState([initialDirection]);
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [servings, setServings] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [recipeImage, setRecipeImage] = useState(null);

    const [errors, setErrors] = useState({});

    function handleIngredientChange(i, event) {
        const values = [...ingredients];
        values[i][event.target.name] = event.target.value
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
        const values = [...directions];
        values[i][event.target.name] = event.target.value
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})

        const formData = FormData()

        formData.append("name", name)
        formData.append("description", description)
        formData.append("prep_time", prepTime)
        formData.append("cook_time", cookTime)
        formData.append("servings", servings)
        formData.append('preview_image', previewImage)
        formData.append('recipe_image', recipeImage)

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

        fetch('/api/recipes/new', {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

        const payload = {
            name,
            description,
            ingredients,
            directions,
            prepTime,
            cookTime,
            servings,
        }
        const newRecipe = await dispatch(RecipeActions.createRecipeThunk(payload));

        if (newRecipe) {
            history.push(`/recipes/${newRecipe.id}`);
        }
    }

    return (
        <></>
    )
}

export default CreateRecipe
