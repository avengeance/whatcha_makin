from app.models import db, RecipeIngredient, environment, SCHEMA
from sqlalchemy.sql import text

def seed_recipe_ingredients():
    recipe_ingredients = [
        # casserole
        {
            'recipe_id': 1,
            'ingredient_id': 1,
            'quantity': 6,
            'measurement': 'large'
        },
        {
            'recipe_id': 1,
            'ingredient_id': 2,
            'quantity': 1,
            'measurement': 'cup'
        },
        {
            'recipe_id': 1,
            'ingredient_id': 22,
            'quantity': 6,
            'measurement': 'slices'
        }
        {
            'recipe_id': 1,
            'ingredient_id': 3,
            'quantity': 2,
            'measurement': 'slices'
        },
        {
            'recipe_id': 1,
            'ingredient_id': 43,
            'quantity': 0.3,
            'measurement': 'whole'
        },
        {
            'recipe_id': 1,
            'ingredient_id': 49,
            'quantity': 2,
            'measurement': 'whole'
        },
        {
            'recipe_id': 1,
            'ingredient_id': 6,
            'quantity': 3,
            'measurement': 'tablespoons'
        },
        {
            'recipe_id': 1,
            'ingredient_id': 25,
            'quantity': 0.5,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 1,
            'ingredient_id': 23,
            'quantity': 1,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 1,
            'ingredient_id': 24,
            'quantity': 1,
            'measurement': 'teaspoons'
        },
        # crepe
        {
            'recipe_id': 2,
            'ingredient_id': 5,
            'quantity': 1,
            'measurement': 'cup'
        },
        {
            'recipe_id': 2,
            'ingredient_id': 1,
            'quantity': 2,
            'measurement': 'large'
        },
        {
            'recipe_id': 2,
            'ingredient_id': 6,
            'quantity': 0.5,
            'measurement': 'cup'
        },
        {
            'recipe_id': 2,
            'ingredient_id': 7,
            'quantity': 0.5,
            'measurement': 'cup'
        },
        {
            'recipe_id': 2,
            'ingredient_id': 23,
            'quantity': 0.25,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 2,
            'ingredient_id': 30,
            'quantity': 2,
            'measurement': 'tablespoons'
        },
        # french toast
        {
            'recipe_id': 3,
            'ingredient_id': 6,
            'quantity': 0.5,
            'measurement': 'cup'
        },
        {
            'recipe_id': 3,
            'ingredient_id': 1,
            'quantity': 2,
            'measurement': 'large'
        },
        {
            'recipe_id': 3,
            'ingredient_id': 27,
            'qunantity': 1,
            'measurement': 'tablespoons'
        },
        {
            'recipe_id': 3,
            'ingredient_id': 28,
            'quantity': 0.5,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 3,
            'ingredient_id': 23,
            'quantity': 1,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 3,
            'ingredient_id': 8,
            'quantity': 4.5,
            'measurement': 'Slices'
        },
        {
            'recipe_id': 3,
            'ingredient_id': 28,
            'quantity': 1,
            'measurement': 'tablespoons'
        }
        # salmon bowl
        {
            'recipe_id': 4,
            'ingredient_id': 9,
            'quantity': 3,
            'measurement': 'ounces'
        },
        {
            'recipe_id': 4,
            'ingredient_id': 10,
            'quantity': 1,
            'measurement': 'cup'
        },
        {
            'recipe_id': 4,
            'ingredient_id': 30,
            'quantity': 1,
            'measurement': 'tablespoons'
        },
        {
            'recipe_id': 4,
            'ingredient_id': 31,
            'quantity': 0.5,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 4,
            'ingredient_id': 32,
            'quantity': 2,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 4,
            'ingredient_id': 33,
            'quantity': 1,
            'measurement': 'sheet'
        },
        {
            'recipe_id': 4,
            'ingredient_id': 11,
            'quantity': 0.5,
            'measurement': 'whole'
        },
        {
            'recipe_id': 4,
            'ingredient_id': 12,
            'quantity': 0.25,
            'measurement': 'cup'
        }
        # sloppy joe
        {
            'recipe_id': 5,
            'ingredient_id': 13,
            'quantity': 1,
            'measurement': 'pound'
        },
        {
            'recipe_id': 5,
            'ingredient_id': 34,
            'quantity': 0.5,
            'measurement': 'cup'
        },
        {
            'recipe_id': 5,
            'ingredient_id': 35,
            'quantity': 0.5,
            'measurement': 'cup'
        },
        {
            'recipe_id': 5,
            'ingredient_id': 36,
            'quantity': 0.75,
            'measurement': 'cup'
        },
        {
            'recipe_id': 5,
            'ingredient_id': 37,
            'quantity': 1,
            'measurement': 'tablespoons'
        },
        {
            'recipe_id': 5,
            'ingredient_id': 38,
            'quantity': 1,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 5,
            'ingredient_id': 39,
            'quantity': 0.5,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 5,
            'ingredient_id': 23,
            'quantity': 1,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 5,
            'ingredient_id': 24,
            'quantity': 1,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 5,
            'ingredient_id': 14,
            'quantity': 6,
            'measurement': 'split'
        }
        # reuben sandwich
        {
            'recipe_id': 6,
            'ingredient_id': 15,
            'quantity': 8,
            'measurement': 'slices'
        },
        {
            'recipe_id': 6,
            'ingredient_id': 40,
            'quantity': 0.5,
            'measurement': 'cup'
        },
        {
            'recipe_id': 6,
            'ingredient_id': 16,
            'quantity': 8,
            'measurement': 'slices'
        },
        {
            'recipe_id': 6,
            'ingredient_id': 17,
            'quantity': 8,
            'measurement': 'slices'
        },
        {
            'recipe_id': 6,
            'ingredient_id': 41,
            'quantity': 1,
            'measurement': 'cup'
        },
        {
            'recipe_id': 6,
            'ingredient_id': 31,
            'quantity': 2,
            'measurement': 'tablespoons'
        },
        # beef stir fry
        {
            'recipe_id': 7,
            'ingredient_id': 42,
            'quantity': 2,
            'measurement': 'tablespoons'
        },
        {
            'recipe_id': 7,
            'ingredient_id': 18,
            'quantity': 1,
            'measurement': 'pound'
        },
        {
            'recipe_id': 7,
            'ingredient_id': 19,
            'quantity': 1.5,
            'measurement': 'cup'
        },
        {
            'recipe_id': 7,
            'ingredient_id': 43,
            'quantity': 1,
            'measurement': 'whole'
        },
        {
            'recipe_id': 7,
            'ingredient_id': 20,
            'quantity': 2,    
            'measurement': 'whole'
        },
        {
            'recipe_id': 7,
            'ingredient_id': 44,
            'quantity': 1,
            'measurement': 'whole'
        },
        {
            'recipe_id': 7,
            'ingredient_id': 25,
            'quantity': 1,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 7,
            'ingredient_id': 30,
            'quantity': 2,
            'measurement': 'tablespoons'
        },
        {
            'recipe_id': 7,
            'ingredient_id': 44,
            'quantity': 2,
            'measurement': 'tablespoons'
        }
        # korean bowl
        {
            'recipe_id': 8,
            'ingredient_id': 13,
            'quantity': 1,
            'measurement': 'pound'
        },
        {
            'recipe_id': 8,
            'ingredient_id': 25,
            'quantity': 5,
            'measurement': 'cloves'
        },
        {
            'recipe_id': 8,
            'ingredient_id': 45,
            'quantity': 1,
            'measurement': 'tablespoons'
        },
        {
            'recipe_id': 8,
            'ingredient_id': 46,
            'quantity': 2,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 8,
            'ingredient_id': 30,
            'quantity': 0.5,
            'measurement': 'cup'
        },
        {
            'recipe_id': 8,
            'ingredient_id': 37,
            'quantity': 0.3,
            'measurement': 'cup'
        },
        {
            'recipe_id': 8,
            'ingredient_id': 44,
            'quantity': 6,
            'measurement': 'whole'
        },
        {
            'recipe_id': 8,
            'ingredient_id': 10,
            'quantity': 4,
            'measurement': 'cups'
        },
        {
            'recipe_id': 8,
            'ingredient_id': 44,
            'quantity': 1,
            'measurement': 'tablespoons'
        }
        # tuna steak
        {
            'recipe_id': 9,
            'ingredient_id': 21,
            'quantity': 5,
            'measurement': 'ounces'
        },
        {
            'recipe_id': 9,
            'ingredient_id': 23,
            'quantity': 1,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 9,
            'ingredient_id': 47,
            'quantity': 0.25,
            'measurement': 'teaspoons'
        },
        {
            'recipe_id': 9,
            'ingredient_id': 30,
            'quantity': 0.5,
            'measurement': 'tablespoons'
        },
        {
            'recipe_id': 9,
            'ingredient_id': 48,
            'quantity': 2,
            'measurement': 'tablespoons'
        },
        {
            'recipe_id': 9,
            'ingredient_id': 24,
            'quantity': 1,
            'measurement': 'teaspoons'
        }
        
    ]
