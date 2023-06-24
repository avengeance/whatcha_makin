from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class IngredientForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    measurement = StringField('Measurement', validators=[DataRequired()])
    is_seasoning = BooleanField('Is Seasoning')
