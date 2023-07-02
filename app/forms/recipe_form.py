from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, FormField, FieldList, SubmitField
from wtforms.validators import DataRequired
from werkzeug.datastructures import MultiDict

class IngredientForm(FlaskForm):
    name = StringField('Name')
    quantity = IntegerField('Quantity')
    measurement = StringField('Measurement')
    is_seasoning = BooleanField('Is Seasoning')

class DirectionForm(FlaskForm):
    step = IntegerField('Step')
    step_info = StringField('Step Info')

class RecipeForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    
    ingredients = FieldList(FormField(IngredientForm))
    directions = FieldList(FormField(DirectionForm))
    
    prep_time = IntegerField('Prep Time', validators=[DataRequired()])
    cook_time = IntegerField('Cook Time', validators=[DataRequired()])
    servings = IntegerField('Servings', validators=[DataRequired()])
    
    preview_image = StringField('Preview Image', validators=[DataRequired()])
    recipe_image = StringField('Recipe Image')
    
    
class EditRecipeForm(FlaskForm):
    name = StringField('Name')
    description = TextAreaField('Description')
    
    ingredients = FieldList(FormField(IngredientForm))
    directions = FieldList(FormField(DirectionForm))
    
    prep_time = IntegerField('Prep Time')
    cook_time = IntegerField('Cook Time')
    servings = IntegerField('Servings')
    
    preview_image = StringField('Preview Image')
    recipe_image = StringField('Recipe Image')
    
