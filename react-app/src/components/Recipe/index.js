import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import "./Recipe.css";

function Recipe() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tooltipRef = useRef();
    const recipe = useSelector((state) => Object.values(state.recipes));

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("/api/recipes")
            .then((res) => res.json())
            .then((data) => {
                const recipeArray = data.recipes
                setRecipes(recipeArray)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }, [])

    const tileHover = (e, recipeName) => {
        const tooltip = tooltipRef.current
        tooltip.textContent = recipeName
        tooltip.style.display = 'block'

        const x = e.clientX
        const y = e.clientY

        tooltip.style.top = `${y + 20}px`
        tooltip.style.left = `${x + 10}px`
    }

    return (
        <div className='recipe-tile-container'>
            <div ref={tooltipRef} id='recipe-tooltip'></div>
            {recipes.map(recipe => (
                <div className='recipe-tile'
                    key={recipe.id}
                    onMouseEnter={(e) => tileHover(e, recipe.name)}
                    onMouseOut={() => {
                        const tooltip = document.getElementById('recipe-tooltip')
                        tooltip.textContent = ''
                    }}
                    onClick={() => window.location.href = `/recipes/${recipe.id}`}>
                    <img src={recipe.preview_image[0].url} alt={recipe.name} id='recipe-tile-image' />
                    <div title={recipe.name}>
                        <div className='recipe-review-likes-container'>
                            <div id='recipe-name'>
                                {recipe.name}
                            </div>
                            <div className='recipe-review-likes'>
                                <div id='avgRating'>
                                    <i className='fas fa-star'></i>
                                    {recipe.avg_rating ? recipe.avg_rating.toFixed(1) : 'New'}
                                </div>
                                <div id='likes'>
                                    {recipe.likes > 0
                                        ? <><i className="fa-solid fa-heart"></i> {recipe.likes} </>
                                        : <><i className="far fa-heart"></i> New</>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Recipe
