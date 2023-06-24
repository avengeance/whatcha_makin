from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FormField, FieldList, SubmitField
from wtforms.validators import DataRequired

from .direction_form import DirectionForm
from .ingredient_form import IngredientForm
from .recipe_image_form import RecipeImageForm
from .time_form import TimeForm

class RecipeForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    ingredients = FieldList(FormField(IngredientForm), min_entries=1)
    directions = FieldList(FormField(DirectionForm), min_entries=1)
    time = FieldList(FormField(TimeForm), min_entries=1)
    preview_image = StringField('Preview Image', validators=[DataRequired()])
    recipe_image = FieldList(FormField(RecipeImageForm), min_entries=1)
    description = TextAreaField('Description')
    submit = SubmitField('Submit')
    
    def __init__(self,*args,**kwargs):
        data = request.get_json()
        super(RecipeForm, self).__init__(data=data, *args, **kwargs)
