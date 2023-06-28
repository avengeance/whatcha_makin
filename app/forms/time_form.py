from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class TimeForm(FlaskForm):
    prep_time=IntegerField('Prep Time')
    cook_time=IntegerField('Cook Time')
    servings=IntegerField('Servings')
