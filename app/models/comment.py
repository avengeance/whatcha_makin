from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)
    
    users = db.relationship('User', back_populates='comments', lazy=True, cascade='all, delete')
    recipe = db.relationship('Recipe', back_populates='comments', lazy=True, cascade='all, delete')
    
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'recipe_id': self.recipe_id,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
