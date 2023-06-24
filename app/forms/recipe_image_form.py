from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FileField
from wtforms.validators import DataRequired

class RecipeImageForm(FlaskForm):
    id = IntegerField('ID', validators=[DataRequired()])
    url = StringField('URL', validators=[DataRequired()])
    is_preview = BooleanField('Is Preview')
