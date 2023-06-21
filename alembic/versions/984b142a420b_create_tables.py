"""Create Tables

Revision ID: 984b142a420b
Revises: 
Create Date: 2023-06-19 21:26:17.020005

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '984b142a420b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=50), nullable=False),                
    sa.Column('lastName', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ingredients', 
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('isSeasoning', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('prep_time', sa.Integer(), nullable=False),
    sa.Column('cook_time', sa.Integer(), nullable=False),
    sa.Column('servings', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')                
    )
    op.create_table('directions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), sa.ForeignKey('recipe.id'), nullable=False),
    sa.Column('step', sa.Integer(), nullable=False),
    sa.Column('step_info', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recipe_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), sa.ForeignKey('recipe.id'), nullable=False),
    sa.Column('url', sa.String(length=255)),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('recipe_id', sa.Integer(), sa.ForeignKey('recipe.id'), nullable=False),
    sa.Column('review', sa.String(length=255), nullable=False),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.PrimaryKeyConstraint('id')                
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('recipe_id', sa.Integer(), sa.ForeignKey('recipe.id'), nullable=False),
    sa.Column('comment', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.PrimaryKeyConstraint('id')                
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
    sa.Column('recipe_id', sa.Integer(), sa.ForeignKey('recipe.id'), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recipe_ingredients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), sa.ForeignKey('recipe.id'), nullable=False),
    sa.Column('ingredient_id', sa.Integer(), sa.ForeignKey('ingredients.id'), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.ForeignKeyConstraint(['ingredient_id'], ['ingredients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE users set SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE ingredients set SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE recipes set SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE directions set SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE recipe_images set SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews set SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE comments set SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE likes set SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE recipe_ingredients set SCHEMA {SCHEMA};")

def downgrade() -> None:
    op.drop_table('users')
    op.drop_table('ingredients')
    op.drop_table('recipes')
    op.drop_table('directions')
    op.drop_table('recipe_images')
    op.drop_table('reviews')
    op.drop_table('comments')
    op.drop_table('likes')
    op.drop_table('recipe_ingredients')
