from ..models.db import db
from ..models.ingredient import Ingredient
from ..models.recipe import Recipe
from ..models.direction import Direction
from ..models.recipeImages import RecipeImage
from ..models.review import Review
from ..models.comment import Comment
from ..models.like import Like
from ..models.recipeIngredient import RecipeIngredient

from ..forms.recipe_form import RecipeForm, EditRecipeForm

from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user

from statistics import mean
from datetime import datetime

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

# # Create a New Recipe
@recipe_routes.route('/new', methods=['POST'])
@login_required
def create_recipe():
    data = request.get_json()  
        
    new_recipe = Recipe(
            owner_id=current_user.id,
            name=data['name'],
            description=data['description'],
            prep_time = data['prep_time'],
            cook_time = data['cook_time'],
            servings = data['servings'],
            )
    
    preview_image = RecipeImage(url=data['preview_image'], is_preview=True)
    recipe_image = RecipeImage(url=data['recipe_image'], is_preview=False)
        
    new_recipe.recipe_images.append(preview_image)
    new_recipe.recipe_images.append(recipe_image)
        
    db.session.add(new_recipe)
    db.session.commit()
    
    for direction in request.json.get('directions'):
        new_direction = Direction(
            recipe_id=new_recipe.id,
            step=direction.get('step'),
            step_info=direction.get('step_info'),
        )
        db.session.add(new_direction)
        try:
            db.session.commit()
            print(f"Successfully committed direction: {new_direction.step_number}")
        except Exception as e:
            print(f"Error committing direction: {e}")
            db.session.rollback()
    
    for ingredient_data in request.json.get('ingredients'):

        new_ingredient = Ingredient(
            name=ingredient_data.get('name'),
            is_seasoning=ingredient_data.get('is_seasoning')
        )

        db.session.add(new_ingredient)
    
        try:
            db.session.commit()
            print(f"Committed ingredient with ID: {new_ingredient.id}")
            print("All ingredients:", Ingredient.query.all())
        except Exception as e:
            print(f"Error committing ingredient: {e}")
            db.session.rollback()
            continue

        new_recipe_ingredient = RecipeIngredient(
            recipe_id=new_recipe.id,
            ingredient_id=new_ingredient.id,
            quantity=ingredient_data.get('quantity'),
            measurement=ingredient_data.get('measurement')
        )

        db.session.add(new_recipe_ingredient)

    try:
        db.session.commit()
        print(f"Committed recipe ingredient with ID: {new_recipe_ingredient.ingredient_id}")
        print("All recipe ingredients:", RecipeIngredient.query.all())

    except Exception as e:
        print(f"Error committing recipe ingredient: {e}")
        db.session.rollback()

    return jsonify(new_recipe.to_dict()), 200
        
# Update a Recipe
@recipe_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_recipe(id):
    form = EditRecipeForm(request.form)
    
    if form.validate_on_submit():
        recipe = Recipe.query.get(id)
        
        if recipe is None:
            return jsonify({
                "message": "Could not find a recipe with that ID",
                "status_code": 404
            }), 404
        
        if form.name.data is not None:
            recipe.name = form.name.data
        if form.description.data is not None:
            recipe.description = form.description.data
        if form.prep_time.data is not None:
            recipe.prep_time = form.prep_time.data
        if form.cook_time.data is not None:
            recipe.cook_time.data = form.cook_time.data
        if form.servings.data is not None:
            recipe.servings.data = form.servings.data
        if form.preview_image.data is not None:
            recipe.preview_image.data = form.preview_image.data
        if form.recipe_image.data is not None:
            recipe.recipe_image.data = form.recipe_image.data
        
        # if request.json.get('directions'):
        # handle directions
        direction_ids = []
        for direction_data in request.json.get('directions', []):
            direction_id = direction_data.get('id')
            if direction_id is None: # new direction
                direction = Direction(
                    recipe_id=recipe.id,
                    step=direction_data.get('step'),
                    step_info=direction_data.get('step_info'),
                    )
                db.session.add(direction)
            else: # exisiting direction
                direction = Direction.query.get(direction_id)
                if direction:
                    direction.step = direction_data.get('step',direction.step)
                    direction.step_info = direction_data.get('step_info',direction.step_info)
                else:
                    return jsonify({
                        "message": f"Could not find a direction with ID {direction_id}",
                        "status_code": 400
                        }), 400
                direction_ids.append(direction.id)
            # delete directions not included in the PUT request
            for direction in recipe.directions:
                if direction.id not in direction_ids:
                    db.session.delete(direction)
                
        
        # if request.json.get('ingredients'):
        # handle ingredient and recipe ingredients
        ingredient_ids = []
        for ingredient_data in request.json.get('ingredients', []):
            ingredient_id = ingredient_data.get('id')
            if ingredient_id is None: # new ingredient
                ingredient = Ingredient(
                    name = ingredient_data.get('name'),
                    is_seasoning = ingredient_data.get('is_seasoning')
                    )
                db.session.add(ingredient)
            else: # exisiting ingredient
                ingredient = Ingredient.query.get(ingredient_id)
                if ingredient:
                    ingredient.name = ingredient_data.get('name',ingredient.name)
                    ingredient.is_seasoning = ingredient_data.get('is_seasoning',ingredient.is_seasoning)
                else:
                    return jsonify({
                        "message": f"Could not find an ingredient with ID {ingredient_id}",
                        "status_code": 400 
                        }), 400
                ingredient_ids.append(ingredient.id)
                
            # handle RecipeIngredient
            recipe_ingredient = RecipeIngredient.query.filter_by(recipe_id=recipe.id, ingredient_id=ingredient.id).first()
            if recipe_ingredient is None: # new recipe ingredient
                recipe_ingredient = RecipeIngredient(
                    recipe_id=recipe.id,
                    ingredient_id=ingredient.id,
                    quantity=ingredient_data.get('quantity'),
                    measurement=ingredient_data.get('measurement')
                    )
                db.session.add(recipe_ingredient)
            else: # exisiting recipe ingredient
                recipe_ingredient.quantity = ingredient_data.get('quantity',recipe_ingredient.quantity)
                recipe_ingredient.measurement = ingredient_data.get('measurement',recipe_ingredient.measurement)
                    
        # delete ingredients and recipe ingredients not included in the PUT
        for recipe_ingredient in RecipeIngredient.query.filter_by(recipe_id=recipe.id):
            if recipe_ingredient.ingredient_id not in ingredient_ids:
                db.session.delete(recipe_ingredient)
                # also delete the ingredient itself if it's not used by other recipes
                ingredient = Ingredient.query.get(recipe_ingredient.ingredient_id)
                if ingredient and not ingredient.recipe_ingredients:
                    db.session.delete(ingredient)
            
        try:
            db.session.commit()
            return jsonify(recipe.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error while updating the recipe: {str(e)}")
            return jsonify({
                "message": f"Error while updating the recipe: {str(e)}",
                "status_code": 500 
                }), 500
    else:
        return jsonify({
            "message": "Body validation error",
            "status_code": 400
        })

# Delete a Recipe
@recipe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe:
        Recipe.query.filter_by(id=id).delete()
        db.session.delete(recipe)
        db.session.commit()
        
        res = {
            "id": recipe.id,
            "message": "Successfully deleted",
            "status_code": 200
        }
        
        return jsonify(res), 200
    else:
        res = {
            "message": "Recipe not found",
            "status_code": 404
        }
        return jsonify(res), 404
