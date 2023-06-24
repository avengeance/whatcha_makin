from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class TimeForm(FlaskForm):
    id=IntegerField('ID', validators=[DataRequired()])
    prep_time=IntegerField('Prep Time', validators=[DataRequired()])
    cook_time=IntegerField('Cook Time', validators=[DataRequired()])
    servings=IntegerField('Servings', validators=[DataRequired()])
