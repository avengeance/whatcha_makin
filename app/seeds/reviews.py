from app.models import db, Review, environment,SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1_owner_1 = Review(
        ownerId=1,
        recipeId=1,
        review='This was just amazing and fun to make!',
        stars=5
    )
    review2_owner_1 = Review(
        ownerId=1,
        recipeId=2,
        review='Soooo simple to make and quick!',
        stars=4
    )
    review3_owner_1 = Review(
        ownerId=1,
        recipeId=3,
        review='Not much of a bread person but others did like it.',
        stars=3
    )
    review4_owner_1 = Review(
        ownerId=1,
        recipeId=4,
        review='A simple recipe that can be made on the fly.',
        stars=4
    )
    review5_owner_1 = Review(
        ownerId=1,
        recipeId=5,
        review='Sloppy joes this is a classic.',
        stars=4
    )
    review6_owner_1 = Review(
        ownerId=1,
        recipeId=6,
        review='Not really feeling this sandwich',
        stars=2
    )
    review7_owner_1 = Review(
        ownerId=1,
        recipeId=7,
        review='Quick and easy to make!',
        stars=5
    )
    
    review1_owner_2 = Review(
        ownerId=2,
        recipeId=3,
        review='I absolutely loved this!',
        stars=5
    )
    review2_owner_2 = Review(
        ownerId=2,
        recipeId=4,
        review='The freshness of the Salmon!',
        stars=4
    )
    review3_owner_2 = Review(
        ownerId=2,
        recipeId=5,
        review='Sloppy Joes I loved making this for my kids!',
        stars=5
    )
    review4_owner_2 = Review(
        ownerId=2,
        recipeId=6,
        review='Perfect for my partner!',
        stars=4
    )
    review5_owner_2 = Review(
        ownerId=2,
        recipeId=7,
        review='A little to salty for my taste. Will adjust the next time I make this.',
        stars=3
    )
    review6_owner_2 = Review(
        ownerId=2,
        recipeId=8,
        review='Better than the restaurants!',
        stars=5
    )
    review7_owner_2 = Review(
        ownerId=2,
        recipeId=9,
        review='So yummy had this for dinner.',
        stars=5
    )

    # User 1 Reviews 1-7
    db.session.add(review1_owner_1)
    db.session.add(review2_owner_1)
    db.session.add(review3_owner_1)
    db.session.add(review4_owner_1)
    db.session.add(review5_owner_1)
    db.session.add(review6_owner_1)
    db.session.add(review7_owner_1)

    # User 2 Reviews 3-9
    db.session.add(review1_owner_2)
    db.session.add(review2_owner_2)
    db.session.add(review3_owner_2)
    db.session.add(review4_owner_2)
    db.session.add(review5_owner_2)
    db.session.add(review6_owner_2)
    db.session.add(review7_owner_2)
    
