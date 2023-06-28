from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class DirectionForm(FlaskForm):
    id = IntegerField('ID')
    step = IntegerField('Step')
    step_info = StringField('Step Info')
