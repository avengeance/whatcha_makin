from flask import Blueprint, jsonify
from flask_login import login_required

from app.models import User, Recipe, RecipeImage, Review, Like

from statistics import mean


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Gets all the Recipes by User ID
@user_routes.route('/<int:id>/recipes', methods=['GET'])
@login_required
def get_user_recipes(id):
    user = User.query.get(id)
    
    if(user):
        recipes = Recipe.query.filter_by(owner_id=user.id).all()
        recipe_list = []
        
        for recipe in recipes:
            images = RecipeImage.query.filter_by(recipe_id=recipe.id).all()
            reviews = Review.query.filter_by(recipe_id=recipe.id).all()
            likes = Like.query.filter_by(recipe_id=recipe.id).all()
            recipe_dict = recipe.to_dict()
            
            if reviews:
                avg_rating = mean([reviews.stars for reviews in reviews])
            else:
                avg_rating = 'New'
                
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
            "User Recipes": recipe_list
        }), 200
    return jsonify({
        "message": "User not found"
    })
            
