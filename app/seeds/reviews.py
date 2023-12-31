from app.models import db, Review, environment,SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1_owner_1 = Review(
        owner_id=1,
        recipe_id=8,
        review='This was just amazing and fun to make!',
        stars=5,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review2_owner_1 = Review(
        owner_id=1,
        recipe_id=2,
        review='Soooo simple to make and quick!',
        stars=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review3_owner_1 = Review(
        owner_id=1,
        recipe_id=3,
        review='Not much of a bread person but others did like it.',
        stars=3,        
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review4_owner_1 = Review(
        owner_id=1,
        recipe_id=9,
        review='A simple recipe that can be made on the fly.',
        stars=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review5_owner_1 = Review(
        owner_id=1,
        recipe_id=5,
        review='Sloppy joes this is a classic.',
        stars=4,        
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review6_owner_1 = Review(
        owner_id=1,
        recipe_id=6,
        review='Not really feeling this sandwich',
        stars=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    
    review1_owner_2 = Review(
        owner_id=2,
        recipe_id=3,
        review='I absolutely loved this!',
        stars=5,        
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review2_owner_2 = Review(
        owner_id=2,
        recipe_id=4,
        review='The freshness of the Salmon!',
        stars=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review3_owner_2 = Review(
        owner_id=2,
        recipe_id=1,
        review='Sloppy Joes I loved making this for my kids!',
        stars=5,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review4_owner_2 = Review(
        owner_id=2,
        recipe_id=6,
        review='Perfect for my partner!',
        stars=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review5_owner_2 = Review(
        owner_id=2,
        recipe_id=7,
        review='A little to salty for my taste. Will adjust the next time I make this.',
        stars=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    review1_owner_3 = Review(
        owner_id=3,
        recipe_id=1,
        review='I absolutely loved this!',
        stars=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review2_owner_3 = Review(
        owner_id=3,
        recipe_id=2,
        review='Crepes are my favorite!',
        stars=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review3_owner_3 = Review(
        owner_id=3,
        recipe_id=4,
        review="A taste of Hawaiian Food!",
        stars=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review4_owner_3 = Review(
        owner_id=3,
        recipe_id=5,
        review='A bit not seasoned enough for my taste.',
        stars=2,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review5_owner_3 = Review(
        owner_id=3,
        recipe_id=7,
        review='Little ingredients and easy to make!',
        stars=3,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    review6_owner_3 = Review(
        owner_id=3,
        recipe_id=8,
        review='Never made korean food before and this was a great first recipe!',
        stars=4,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    
    # User 1 Reviews
    db.session.add(review1_owner_1)
    db.session.add(review2_owner_1)
    db.session.add(review3_owner_1)
    db.session.add(review4_owner_1)
    db.session.add(review5_owner_1)
    db.session.add(review6_owner_1)


    # User 2 Reviews
    db.session.add(review1_owner_2)
    db.session.add(review2_owner_2)
    db.session.add(review3_owner_2)
    db.session.add(review4_owner_2)
    db.session.add(review5_owner_2)
    
    # User 3 Reviews
    db.session.add(review1_owner_3)
    db.session.add(review2_owner_3)
    db.session.add(review3_owner_3)
    db.session.add(review4_owner_3)
    db.session.add(review5_owner_3)
    db.session.add(review6_owner_3)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
            
    db.session.commit()
