from ..models.db import db
from ..models.ingredient import Ingredient
from ..models.recipe import Recipe
from ..models.direction import Direction
from ..models.recipeImages import RecipeImage
from ..models.review import Review
from ..models.like import Like
from ..models.recipeIngredient import RecipeIngredient

from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user

from statistics import mean

import json

recipe_routes = Blueprint('recipes', __name__)

# View all recipes
@recipe_routes.route('/', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    recipe_list = []
    
    for recipe in recipes:
        images = RecipeImage.query.filter_by(recipe_id=recipe.id).all()
        reviews = Review.query.filter_by(recipe_id=recipe.id).all()
        likes = Like.query.filter_by(recipe_id=recipe.id).all()
        
        if reviews:
            avg_rating = mean([reviews.stars for reviews in reviews])
        else:
            avg_rating = "New"
            
        likes = len(likes) if likes else 0
        
        preview_image = [{"url": image.url for image in images if image.is_preview}]

        recipe_dict = {
            "id": recipe.id,
            "owner_id": recipe.owner_id,
            "name": recipe.name,
            "preview_image": preview_image,
            "avg_rating": avg_rating,
            "likes": likes,
        }
    
        recipe_list.append(recipe_dict)
    
    return jsonify({
        "Recipes": recipe_list
    }), 200
