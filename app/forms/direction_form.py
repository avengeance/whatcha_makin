from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class DirectionForm(FlaskForm):
    id = IntegerField('ID', validators=[DataRequired()])
    step = IntegerField('Step', validators=[DataRequired()])
    step_info = StringField('Step Info', validators=[DataRequired()])
