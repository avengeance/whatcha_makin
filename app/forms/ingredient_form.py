from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class IngredientForm(FlaskForm):
    id = IntegerField('ID')
    quantity = IntegerField('Quantity')
    measurement = StringField('Measurement')
    is_seasoning = BooleanField('Is Seasoning')
