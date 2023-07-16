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
from ..forms.review_form import ReviewForm, EditReviewForm

from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user
from werkzeug.datastructures import MultiDict

from statistics import mean
from datetime import datetime
from sqlalchemy.orm import joinedload

import json

recipe_routes = Blueprint('recipes', __name__)

# View all recipes
# This is to be displayed on the landing page
@recipe_routes.route('/', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    recipe_list = []
    print("-----------------------------------------------------")
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
        "recipes": recipe_list
    }), 200

# View Receipe Details by Id
# When a user clicks on a recipe from the landing page, this route will
# display a more detailed view of the recipe
@recipe_routes.route('/<int:id>', methods=['GET'])
def get_recipe(id):
    # recipe = Recipe.query.get(id)
    recipe = Recipe.query.options(joinedload('user')).get(id)
    print(recipe)
    
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
            
        owner= recipe.user
        
        recipe_dict = {
            "id": recipe.id,
            "owner_id": recipe.owner_id,
            "owner_name": f"{owner.first_name} {owner.last_name}",
            "name": recipe.name,
            "images": image_list,
            "avg_rating": avg_rating,
            "likes": likes,
            "ingredients": ingredients,
            "directions": directions_list,
            "reviews": reviews_list,
            "comments": comments_list,
            "description": recipe.description,
            "prep_time": recipe.prep_time,
            "cook_time": recipe.cook_time,
            "total_time": recipe.prep_time + recipe.cook_time,
            "servings": recipe.servings
        }
        return jsonify(recipe_dict), 200

    return jsonify({
        "message": "Recipe not found"
    }), 404

# Create a New Recipe
@recipe_routes.route('/new/', methods=['POST'])
@login_required
def create_recipe():
    # form = RecipeForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    # try:
        for key in request.form:
            print(f"{key}: {request.form[key]}")
            for key in request.form:
                print(f"{key}: {request.form[key]}")
        new_recipe = Recipe(
            owner_id = current_user.id,
            name = request.form.get('name'),
            description = request.form.get('description'),
            prep_time = request.form.get('prep_time'),
            cook_time = request.form.get('cook_time'),
            servings = request.form.get('servings')
            )
            # preview_image = request.files.get('preview_image')
            # if preview_image:
            #     preview_image_string = base64.b64encode(preview_image.read()).decode()
            # else:
            #     print(form.errors)

            # new_recipe_image = RecipeImage(
            #     url = preview_image_string,
            #     is_preview = True,
            #     recipe = new_recipe
            # )

            # recipe_image = request.files.get('recipe_image')
            # if recipe_image:
            #     recipe_image_string = base64.b64encode(recipe_image.read()).decode()
            # else:
            #     print(form.errors)

            # new_recipe_image2 = RecipeImage(
            #     url = recipe_image_string,
            #     is_preview = False,
            #     recipe = new_recipe
            # )

        db.session.add(new_recipe)
            # print(new_recipe)
            # db.session.add(new_recipe_image)
            # print(new_recipe_image)
            # db.session.add(new_recipe_image2)
            # print(new_recipe_image2)
        db.session.commit()
        directions = json.loads(request.form.get('directions'))
        for direction in directions:
            new_direction = Direction(
                recipe_id = new_recipe.id,
                step = direction['step'],
                step_info = direction['stepInfo'],
                )
            db.session.add(new_direction)
            db.session.commit()

        ingredients = json.loads(request.form.get('ingredients'))
        print("This is ingredients:", ingredients)
        for ingredient in ingredients:
            new_ingredient = Ingredient(
                name = ingredient['name'],
                is_seasoning = ingredient['isSeasoning']
                )

            db.session.add(new_ingredient)
            db.session.commit()

            new_recipe_ingredient = RecipeIngredient(
                recipe_id = new_recipe.id,
                ingredient_id = new_ingredient.id,
                quantity = ingredient['quantity'],
                measurement = ingredient['measurement']
                )

            db.session.add(new_recipe_ingredient)
            db.session.commit()

            
        db.session.commit()
        return jsonify(new_recipe.to_dict()), 201
        
# Update a Recipe
@recipe_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_recipe(id):
    # try:
        # db.session.begin(subtransactions=True)
        
        # form = EditRecipeForm(data=request.json)
        # form['csrf_token'].data = request.cookies['csrf_token']
        
        # form.name.data = request.json.get('name')
        # form.description.data = request.json.get('description')
        # form.prep_time.data = request.json.get('prep_time')
        # form.cook_time.data = request.json.get('cook_time')
        # form.servings.data = request.json.get('servings')
        # form.preview_image.data = request.json.get('preview_image')
        # form.recipe_image.data = request.json.get('recipe_image')
        
        # if form.validate_on_submit():
        # print("******************************************************************************")
        recipe = Recipe.query.get(id)
        # print("This is recipe:", recipe.to_dict())
        print("****************Recipe ingredients:************", recipe.recipe_ingredients)
        print("----------------Recipe directions--------------", recipe.directions)
        print("----------------request form---------------------", request.form)        
        # print("This is recipe.name", recipe.name)
        # print("this is request form name:", request.form['name'],)
        # print("This is recipe:", recipe.directions)
        recipe.name = request.form.get('name', recipe.name)
        recipe.description = request.form.get('description', recipe.description)
        recipe.prep_time = request.form.get('prep_time', recipe.prep_time)
        recipe.cook_time = request.form.get('cook_time', recipe.cook_time)
        recipe.servings = request.form.get('servings', recipe.servings)

        db.session.add(recipe)
        db.session.commit()
        
        directions = json.loads(request.form.get('directions'))
        # directions = recipe.directions
        # directions = json.loads(request.data['directions'])
        Direction.query.filter_by(recipe_id=id).delete()
        for direction in directions:
            new_direction = Direction(
                # recipe_id=recipe.id,
                # step=direction['step'],
                # step_info=direction['stepInfo']
                recipe_id=recipe.id,
                step=direction.step,
                step_info=direction.step_info
            )
            db.session.add(new_direction)
            db.session.commit()
            
        ingredients = json.loads(request.form.get('ingredients'))
        # ingredients = json.loads(request.data['ingredients'])
        # print("Received ingredients", request.form.get('ingredients'))
        # ingredients = recipe.recipe_ingredients
        # print("this is ingredients:", ingredients)
        # Loop through the RecipeIngredients
        # print("Loaded ingredients", ingredients)
        for recipe_ingredient in ingredients:
            # Get the related Ingredient using the foreign key
            ingredient = recipe_ingredient.ingredients
            # print("Updating ingredient", ingredient)
  
            existing = Ingredient.query.filter_by(name=ingredient.name).first()
            if existing:
                new_ingredient = existing
            else:
                # Create a new Ingredient object with properties from the related Ingredient
                new_ingredient = Ingredient(
                    name = ingredient.name,  
                    is_seasoning = ingredient.is_seasoning
                )

                db.session.add(new_ingredient)
                db.session.commit()

                # Create a new RecipeIngredient linking the new Ingredient 
                new_recipe_ingredient = RecipeIngredient(
                    recipe_id = recipe.id,
                    ingredient_id = new_ingredient.id,  
                    quantity = recipe_ingredient.quantity,
                    measurement = recipe_ingredient.measurement
                )

                db.session.add(new_recipe_ingredient)
                db.session.commit()
        
        # Ingredient.query.filter_by(recipe_id=id).delete()
        # for ingredient in ingredients:
        #     new_ingredient = Ingredient(
        #         # name = ingredient['name'],
        #         # is_seasoning = ingredient['isSeasoning']
        #         name = ingredient.name,
        #         is_seasoning = ingredient.is_seasoning
        #         )

        #     db.session.add(new_ingredient)
        #     db.session.commit()

        #     new_recipe_ingredient = RecipeIngredient(
        #         # recipe_id = recipe.id,
        #         ingredient_id = new_ingredient.id,
        #         # quantity = ingredient['quantity'],
        #         # measurement = ingredient['measurement']
        #         quantity = ingredient.quantity,
        #         measurement = ingredient.measurement
        #         )

        #     db.session.add(new_recipe_ingredient)
        #     db.session.commit()
        
        
        if recipe is None:
            return jsonify({
                "message": "Could not find a recipe with that ID",
                "status_code": 404
            }), 404

         
            # if form.name.data is not None:
            #     recipe.name = form.name.data
            # if form.description.data is not None:
            #     recipe.description = form.description.data
            # if form.prep_time.data is not None:
            #     recipe.prep_time = form.prep_time.data
            # if form.cook_time.data is not None:
            #     recipe.cook_time = form.cook_time.data
            # if form.servings.data is not None:
            #     recipe.servings = form.servings.data
                
            # if 'preview_image' in request.json:
            #     recipe.preview_image = request.json['preview_image']
                
            # if 'recipe_image' in request.json:
            #     recipe.recipe_image = request.json['recipe_image']
        
            # handle directions
            # direction_ids = []
            # for direction_data in request.json.get('directions', []):
            #     direction_id = direction_data.get('id')
            #     if direction_id is None: # new direction
            #         if recipe is None:
            #             return jsonify({
            #                 "message": "Could not find a recipe with that ID",
            #                 "status_code": 404
            #             }), 404
                        
            #         new_direction = Direction(
            #             recipe_id=recipe.id,
            #             step=direction_data.get('step'),
            #             step_info=direction_data.get('step_info'),
            #             )
            #         db.session.add(new_direction)
            #     else: # exisiting direction
            #         direction = Direction.query.get(direction_id)
            #         if direction:
            #             direction.recipe_id = recipe.id
            #             direction.step = direction_data.get('step',direction.step)
            #             direction.step_info = direction_data.get('step_info',direction.step_info)
            #         else:
            #             return jsonify({
            #                 "message": f"Could not find a direction with ID {direction_id}",
            #                 "status_code": 400
            #                 }), 400
            #         direction_ids.append(direction.id)
            #     # delete directions not included in the PUT request
            # for direction in recipe.directions:
            #     if direction.id not in direction_ids:
            #         db.session.delete(direction)
            # db.session.commit()         
            
            # handle ingredient and recipe ingredients
        # ingredient_ids = []
        # for ingredient_data in request.json.get('ingredients', []):
        #         ingredient_id = ingredient_data.get('id')
        #         if ingredient_id is None: # new ingredient
        #             if recipe is None:
        #                 return jsonify({
        #                     "message": "Could not find a recipe with that ID",
        #                     "status_code": 404
        #                 }), 404
                        
        #             ingredient = Ingredient(
        #                 name = ingredient_data.get('name'),
        #                 is_seasoning = ingredient_data.get('is_seasoning')
        #                 )
        #             db.session.add(ingredient)
        #             db.session.commit()
        #             ingredient_ids.append(ingredient.id)
        #         else: # exisiting ingredient
        #             ingredient = Ingredient.query.get(ingredient_id)
        #             if ingredient:
        #                 ingredient.name = ingredient_data.get('name',ingredient.name)
        #                 ingredient.is_seasoning = ingredient_data.get('is_seasoning',ingredient.is_seasoning)
        #                 ingredient_ids.append(ingredient.id)
        #             else:
        #                 return jsonify({
        #                     "message": f"Could not find an ingredient with ID {ingredient_id}",
        #                     "status_code": 400 
        #                     }), 400
                    
                # handle RecipeIngredient
                # recipe_ingredient = RecipeIngredient.query.filter_by(recipe_id=recipe.id, ingredient_id=ingredient.id).first()
                # if recipe_ingredient is None: # new recipe ingredient
                #     if recipe is None:
                #         return jsonify({
                #             "message": "Could not find a recipe with that ID",
                #             "status_code": 404
                #         }), 404
                        
                #     recipe_ingredient = RecipeIngredient(
                #         recipe_id=recipe.id,
                #         ingredient_id=ingredient.id,
                #         quantity=ingredient_data.get('quantity'),
                #         measurement=ingredient_data.get('measurement')
                #         )
                #     db.session.add(recipe_ingredient)
                # else: # exisiting recipe ingredient
                #     recipe_ingredient.quantity = ingredient_data.get('quantity',recipe_ingredient.quantity)
                #     recipe_ingredient.measurement = ingredient_data.get('measurement',recipe_ingredient.measurement)
                        
            # delete ingredients and recipe ingredients not included in the PUT
        # for recipe_ingredient in RecipeIngredient.query.filter_by(recipe_id=recipe.id):
        #         if recipe_ingredient.ingredient_id not in ingredient_ids:
        #             db.session.delete(recipe_ingredient)
        #             db.session.commit()
        #             # also delete the ingredient itself if it's not used by other recipes
        #             ingredient = Ingredient.query.get(recipe_ingredient.ingredient_id)
        #             if ingredient and not ingredient.recipe_ingredients:
        #                 db.session.delete(ingredient)
                
            # try:
            #     with db.session.no_autoflush:
            #         db.session.commit()
            #     return jsonify(recipe.to_dict()), 200
            # except Exception as e:
            #     db.session.rollback()
            #     print(f"Error while updating the recipe: {str(e)}")
            #     return jsonify({
            #         "message": f"Error while updating the recipe: {str(e)}",
            #         "status_code": 500 
            #         }), 500
                
        db.session.commit()
        return jsonify(recipe.to_dict()), 200
    # except Exception as e:
    #     db.session.rollback()
    #     print(f"Error while updating the recipe: {str(e)}")
    #     return jsonify({
    #         "message": f"Error while updating the recipe: {str(e)}",
    #         "status_code": 500
    #     }), 500

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

# View all Reviews by Recipe ID
@recipe_routes.route('/<int:id>/reviews', methods=['GET'])
def get_all_recipe_reviews(id):
    recipe = Recipe.query.get(id)
    
    if(recipe):
        reviews = Review.query.filter_by(recipe_id=id).all()
        reviews_dict = [review.to_dict() for review in reviews]
        return jsonify(reviews_dict), 200

    else:
        return jsonify({
            "message": "Recipe does not exist",
            "status_code": 404
        }), 404

# Create a review
@recipe_routes.route('/<int:id>/reviews/', methods=['POST'])
@login_required
def create_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    exisiting_review = Review.query.filter_by(owner_id=current_user.id, recipe_id=id).first()
    if exisiting_review:
        return jsonify({
            "message": "You have already reviewed this recipe",
            "status_code": 400
        }), 400
    
    if form.validate_on_submit():
        review = form.review.data
        stars = form.stars.data
        
        new_review = Review(
            owner_id = current_user.id,
            recipe_id = id,
            review=review,
            stars=stars
        )
        
        db.session.add(new_review)
        db.session.commit()
        
        return jsonify(new_review.to_dict()), 201
    else:
        return jsonify(form.errors), 400
    
# Get a review
# @recipe_routes.route('/<int:id>/reviews/<int:review_id>', methods=['GET'])
# def get_review(review_id):
#     review = Review.query.get(review_id)

#     if review is None:
#         return jsonify({
#             "error": "Review does not exist",
#             "status_code": 404
#         }), 404

#     review_dict = review.to_dict()
#     return jsonify(review_dict), 200

# View Likes by Recipe ID (Bonus Feature)
@recipe_routes.route('/<int:id>/likes', methods=['GET'])
def view_likes(id):
    recipe = Recipe.query.get(id)
    
    if recipe:
        likes = Like.query.filter_by(recipe_id=id).all()
        likes_dict = [like.to_dict() for like in likes]
        return jsonify(likes_dict), 200
    else:
        return jsonify({
            "message": "Recipe does not exist",
            "status_code": 404
        }), 404
    
# Create a Like
@recipe_routes.route('/<int:id>/likes/new', methods=['POST'])
@login_required
def create_like(id):
    user_id = current_user.id
    new_like = Like(
        user_id = user_id,
        recipe_id = id
    )
    db.session.add(new_like)
    db.session.commit()
    
    return jsonify(new_like.to_dict()), 201
        
# Delete a Like
@recipe_routes.route('/<int:id>/likes/<int:like_id>/delete', methods=['DELETE'])
@login_required
def delete_like(id,like_id):
    like = Like.query.get(like_id)
    
    if like:
        db.session.delete(like)
        db.session.commit()
        
        res = {
            "id": like.id,
            "message": "Successfully deleted",
            "status_code": 200
        }
        
        return jsonify(res),200
    else:
        res = {
            "message": "Like not found",
            "status_code": 404
        }
        return jsonify(res), 404

# View Comments by Recipe ID
@recipe_routes.route('/<int:id>/comments', methods=['GET'])
def view_comments(id):
    recipe = Recipe.query.get(id)
    
    if recipe:
        comments = Comment.query.filter_by(recipe_id=id).all()
        comments_dict = [comment.to_dict() for comment in comments]
        return jsonify(comments_dict), 200
    else:
        return jsonify({
            "message": "Recipe does not exist",
            "status_code": 404
        }), 404
        
# Create a Comment
@recipe_routes.route('/<int:id>/comments/new', methods=['POST'])
@login_required
def create_comment(id):
    recipe = Recipe.query.get(id)
    if recipe:
        if request.is_json:
            data = request.get_json()
            data = json.loads(data) if isinstance(data,str) else data
            comment = Comment(
                owner_id = current_user.id,
                recipe_id = id,
                comment=data['comment']
            )
            db.session.add(comment)
            db.session.commit()
            
            return jsonify(comment.to_dict()), 201
    else:
        res = {
            "message": "Recipe does not exist",
            "status_code": 404
        }
        return jsonify(res), 404

# Delete a Comment
@recipe_routes.route('/<int:id>/comments/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(id,comment_id):
    comment = Comment.query.get(comment_id)
    
    if comment:
        db.session.delete(comment)
        db.session.commit()
        
        res = {
            "id": comment.id,
            "message": "Successfully deleted",
            "status_code": 200
        }
        
        return jsonify(res), 200
    else:
        res = {
            "message": "Comment not found",
            "status_code": 404
        }
        return jsonify(res), 404
