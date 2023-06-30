from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, FormField, FieldList, SubmitField
from wtforms.validators import DataRequired
from werkzeug.datastructures import MultiDict


class RecipeForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    
    ingredient_name = StringField('Name', validators=[DataRequired()])
    ingredient_quantity = IntegerField('Quantity', validators=[DataRequired()])
    ingredient_measurement = StringField('Measurement', validators=[DataRequired()])
    ingredient_seasoning = BooleanField('Is Seasoning')
    
    direction_step = IntegerField('Step')
    direction_step_info = StringField('Step Info', validators=[DataRequired()])
    
    prep_time = IntegerField('Prep Time', validators=[DataRequired()])
    cook_time = IntegerField('Cook Time', validators=[DataRequired()])
    servings = IntegerField('Servings', validators=[DataRequired()])
    
    preview_image = StringField('Preview Image', validators=[DataRequired()])
    recipe_image = StringField('Recipe Image')
    
class IngredientForm(FlaskForm):
    name = StringField('Name')
    quantity = IntegerField('Quantity')
    measurement = StringField('Measurement')
    is_seasoning = BooleanField('Is Seasoning')

class DirectionForm(FlaskForm):
    step = IntegerField('Step')
    step_info = StringField('Step Info')
    
class EditRecipeForm(FlaskForm):
    name = StringField('Name')
    description = TextAreaField('Description')
    
    # ingredient_name = StringField('Name')
    # ingredient_quantity = IntegerField('Quantity')
    # ingredient_measurement = StringField('Measurement')
    # ingredient_seasoning = BooleanField('Is Seasoning')
    
    # direction_step = IntegerField('Step')
    # direction_step_info = StringField('Step Info')
    
    ingredients = FieldList(FormField(IngredientForm))
    directions = FieldList(FormField(DirectionForm))
    
    prep_time = IntegerField('Prep Time')
    cook_time = IntegerField('Cook Time')
    servings = IntegerField('Servings')
    
    preview_image = StringField('Preview Image')
    recipe_image = StringField('Recipe Image')
    
