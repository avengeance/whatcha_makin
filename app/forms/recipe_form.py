from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, FormField, FieldList, SubmitField
from wtforms.validators import DataRequired


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
    