from flask.cli import AppGroup
from .users import seed_users, undo_users
from .ingredients import seed_ingredients, undo_ingredients
from .recipes import seed_recipes, undo_recipes
from .directions import seed_directions, undo_directions
from .recipeImages import seed_recipe_images, undo_recipe_images
from .reviews import seed_reviews, undo_reviews
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .recipeIngredients import seed_recipe_ingredients, undo_recipe_ingredients


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.directions RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipe_images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipe_ingredients RESTART IDENTITY CASCADE;")
        
        db.session.commit()
        
    seed_users()
    seed_ingredients()
    seed_recipes()
    seed_directions()
    seed_recipe_images()
    seed_reviews()
    seed_comments()
    seed_likes()
    seed_recipe_ingredients()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_ingredients()
    undo_recipes()
    undo_directions()
    undo_recipe_images()
    undo_reviews()
    undo_comments()
    undo_likes()
    undo_recipe_ingredients()
    # Add other undo functions here
