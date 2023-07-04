import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as RecipeActions from "./store/recipes";
import { csrfFetch } from "../../store/csrf";
import Cookies from "js-cookie";

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
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null)
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

    useEffect(() => {
        async function getRecipeThunk() {
            const res = await csrfFetch(`/api/recipes/${id}`);
            if (res.ok) {
                const recipe = await res.json()
                setRecipe(recipe)
                setName(recipe.name)
                setDescription(recipe.description)
                setIngredients(recipe.ingredients)
                setDirections(recipe.directions)
                setPrepTime(recipe.prepTime)
                setCookTime(recipe.cookTime)
                setServings(recipe.servings)
                setPreviewImage(recipe.image)
                setRecipeImage(recipe.image)
            }
        }
        getRecipeThunk();
    }, [id])

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

        const formData = new FormData()

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

        fetch(`/api/recipes/${id}`, {
            method: "PATCH",
            body: formData
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

        const payload = {
            name: name,
            description: description,
            ingredients: ingredients,
            directions: directions,
            prepTime: prepTime,
            cookTime: cookTime,
            servings: servings,
            previewImage: previewImage,
            recipeImage: recipeImage
        }

        const updatedRecipe = await dispatch(RecipeActions.updateRecipeThunk(id, payload));

        if(updatedRecipe) {
            history.push(`/recipes/${updatedRecipe.id}`);
        }
    }
}
