import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import * as RecipeActions from "./store/recipes";
import { csrfFetch } from "../../store/csrf";
import Cookies from "js-cookie";

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

    return (
        <></>
    )
}
