from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# adds recipe seeds

def seed_recipes():
    egg_casserole = Recipe(
        owner_id=1, name='Egg Casserole', description='Egg Casserole', prep_time=15, cook_time=20, servings=4, createdAt=datetime.now, updatedAt=datetime.now
    )
    crepe = Recipe(
        owner_id=2, name='Crepe', description='Crepe', prep_time=10, cook_time=20, servings=4, createdAt=datetime.now, updatedAt=datetime.now
    )
    french_toast = Recipe(
        owner_id=3, name='French Toast', description='French Toast', prep_time=10, cook_time=20, servings=4, createdAt=datetime.now, updatedAt=datetime.now
    )
    salmon_bowl = Recipe(
        owner_id=1, name='Salmon Bowl', description='Salmon Bowl', prep_time=5, cook_time=5, servings=4, createdAt=datetime.now, updatedAt=datetime.now
    )
    sloppy_joe = Recipe(
        owner_id=2, name='Sloppy Joe', description='Sloppy Joe', prep_time=5, cook_time=30, servings=6, createdAt=datetime.now, updatedAt=datetime.now
    )
    reuben_sandwich = Recipe(
        owner_id=3, name='Reuben Sandwich', description='Reuben Sandwich', prep_time=10, cook_time=10, servings=4, createdAt=datetime.now, updatedAt=datetime.now
    )
    beef_stir_fry = Recipe(
        owner_id=1, name='Beef Stir Fry', description='Beef Stir Fry', prep_time=15, cook_time=25, servings=4, createdAt=datetime.now, updatedAt=datetime.now
    )
    korean_beef_bowl = Recipe(
        owner_id=2, name='Korean Beef Bowl', description='Korean Beef Bowl', prep_time=10, cook_time=25, servings=4, createdAt=datetime.now, updatedAt=datetime.now
    )
    ahi_tuna_steak = Recipe(
        owner_id=3, name='Ahi Tuna Steak', description='Ahi Tuna Steak', prep_time=5, cook_time=2, servings=2, createdAt=datetime.now, updatedAt=datetime.now
    )
    # breakfast
    db.session.add(egg_casserole)
    db.session.add(crepe)
    db.session.add(french_toast)
    
    # lunch
    db.session.add(salmon_bowl)
    db.session.add(sloppy_joe)
    db.session.add(reuben_sandwich)
    
    # dinner
    db.session.add(beef_stir_fry)
    db.session.add(korean_beef_bowl)
    db.session.add(ahi_tuna_steak)

    db.session.commit()
    
    def undo_recipes():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM recipes"))
            
        db.session.commit()
