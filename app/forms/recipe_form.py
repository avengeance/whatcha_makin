from flask import request
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, BooleanField, FormField, FieldList, SubmitField
from wtforms.validators import DataRequired

# from .direction_form import DirectionForm
# from .ingredient_form import IngredientForm
# from .recipe_image_form import RecipeImageForm
# from .time_form import TimeForm

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
    
    # name = StringField('Name', validators=[DataRequired()])
    # ingredients = FieldList(FormField(IngredientForm), min_entries=1)
    # directions = FieldList(FormField(DirectionForm), min_entries=1)
    # time = FieldList(FormField(TimeForm), min_entries=1)
    # preview_image = StringField('Preview Image', validators=[DataRequired()])
    # recipe_image = FieldList(FormField(RecipeImageForm), min_entries=1)
    # description = TextAreaField('Description')
    # submit = SubmitField('Submit')
    
    # def __init__(self,*args,**kwargs):
    #     data = request.get_json()
    #     super(RecipeForm, self).__init__(data=data, *args, **kwargs)
