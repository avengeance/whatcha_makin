from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, FormField, FieldList, FileField, SubmitField
from wtforms.validators import DataRequired
from werkzeug.datastructures import MultiDict

class IngredientForm(FlaskForm):
    name = StringField('Name')
    quantity = StringField('Quantity')
    measurement = StringField('Measurement')
    is_seasoning = BooleanField('Is Seasoning')

class DirectionForm(FlaskForm):
    step = IntegerField('Step')
    step_info = StringField('Step Info')

class RecipeForm(FlaskForm):
    name = StringField('Name')
    description = StringField('Description')
    
    ingredients = FieldList(FormField(IngredientForm))
    directions = FieldList(FormField(DirectionForm))
    
    prep_time = IntegerField('Prep Time')
    cook_time = IntegerField('Cook Time')
    servings = StringField('Servings')
    
    preview_image = FileField('Preview Image')
    recipe_image = FileField('Recipe Image')
    
    
class EditRecipeForm(FlaskForm):
    name = StringField('Name')
    description = StringField('Description')
    
    ingredients = FieldList(FormField(IngredientForm))
    directions = FieldList(FormField(DirectionForm))
    
    prep_time = IntegerField('Prep Time')
    cook_time = IntegerField('Cook Time')
    servings = StringField('Servings')
    
    preview_image = FileField('Preview Image')
    recipe_image = FileField('Recipe Image')
    
