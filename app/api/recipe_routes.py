from ..models.db import db
from ..models.ingredient import Ingredient
from ..models.recipe import Recipe
from ..models.direction import Direction
from ..models.recipeImages import RecipeImage
from ..models.review import Review
from ..models.comment import Comment
from ..models.like import Like
from ..models.recipeIngredient import RecipeIngredient

from ..forms.recipe_form import RecipeForm

from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user

from statistics import mean

import json

recipe_routes = Blueprint('recipes', __name__)

# View all recipes
# This is to be displayed on the landing page
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

# View Receipe Details by Id
# When a user clicks on a recipe from the landing page, this route will
# display a more detailed view of the recipe
@recipe_routes.route('/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get(id)
    
    if (recipe):
        images = RecipeImage.query.filter_by(recipe_id=id).all()
        reviews = Review.query.filter_by(recipe_id=id).all()
        likes = Like.query.filter_by(recipe_id=id).count()
        comments = Comment.query.filter_by(recipe_id=id).all()
        directions = Direction.query.filter_by(recipe_id=id).all()
        
        ingredients = []
        recipe_ingredients = RecipeIngredient.query.filter_by(recipe_id=id).all()
        ingredient_ids = [recipe_ingredient.ingredient_id for recipe_ingredient in recipe_ingredients]
        all_ingredients = Ingredient.query.filter(Ingredient.id.in_(ingredient_ids)).all()
        
        for ingredient in all_ingredients:
            ingredient_dict = {
                "id": ingredient.id,
                "name": ingredient.name,
                "is_seasoning": ingredient.is_seasoning,
                "quantity": next((ri.quantity for ri in recipe_ingredients if ri.ingredient_id == ingredient.id), None),
                "measurement": next((ri.measurement for ri in recipe_ingredients if ri.ingredient_id == ingredient.id), None)
            }
            ingredients.append(ingredient_dict)
            
        directions_list = []
        
        for direction in directions:
            direction_dict = {
                "id": direction.id,
                "recipe_id": direction.recipe_id,
                "step": direction.step,
                "step_info": direction.step_info,
                "created_at": direction.created_at,
                "updated_at": direction.updated_at
            }
            directions_list.append(direction_dict)
            
        
        if(reviews):
            avg_rating = mean([reviews.stars for reviews in reviews])
            reviews_list = []
            for review in reviews:
                review_dict = {
                    "id": review.id,
                    "owner_id": review.owner_id,
                    "recipe_id": review.recipe_id,
                    "review": review.review,
                    "stars": review.stars,
                    "created_at": review.created_at,
                    "udated_at": review.updated_at
                }
                reviews_list.append(review_dict)
        else:
            avg_rating = "New"
            reviews_list = []
            
        
        image_list = [{
            "id": image.id,
            "url": image.url,
            "is_preview": image.is_preview
        } for image in images]
        
        comments_list = []
        for comment in comments:
            comment_dict = {
                "id": comment.id,
                "owner_id": comment.owner_id,
                "recipe_id": comment.recipe_id,
                "comment": comment.comment,
                "created_at": comment.created_at,
                "updated_at": comment.updated_at
            }
            comments_list.append(comment_dict)
        
        recipe_dict = {
            "id": recipe.id,
            "owner_id": recipe.owner_id,
            "name": recipe.name,
            "images": image_list,
            "avg_rating": avg_rating,
            "likes": likes,
            "ingredients": ingredients,
            "directions": directions_list,
            "reviews": reviews_list,
            "comments": comments_list
        }
        return jsonify(recipe_dict), 200

    return jsonify({
        "message": "Recipe not found"
    }), 404

# Create a New Recipe
@recipe_routes.route('/new', methods=['POST'])
@login_required
def create_recipe():
    form = RecipeForm()
    csrf_token = request.cookies.get('csrf_token')
    
    if csrf_token:
        form['csrf_token'].data = csrf_token
        
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        name = form.name.data
        ingredients = form.ingredients.data
        directions = form.directions.data
        time = form.time.data
        preview_image = form.preview_image.data
        recipe_image = form.recipe_image.data
        description = form.description.data
        
        new_recipe = Recipe(
            owner_id=current_user.id,
            name=name,
            ingredients=ingredients,
            directions=directions,
            time=time,
            preview_image=preview_image,
            recipe_image=recipe_image,
            description=description,
        )
        
        db.session.add(new_recipe)
        db.session.commit()
        
        return jsonify(new_recipe.to_dict()), 200
    else:
        return jsonify(form.errors), 400
