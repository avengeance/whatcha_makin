from app.models import db, Comment,environment,SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comment():
    comment1_owner_1 = Comment(
        ownerId=1,
        recipeId=1,
        comment='Used a smaller pan, replaced the bacon with sausage patty, prepared, chopped and then added to the base mixture. Added heavy cream 4 tablespoons instead of milk.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment2_owner_1 = Comment(
        ownerId=1,
        recipeId=2,
        comment='I thought it was a little dry. but it was sooo goood!',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment3_owner_1 = Comment(
        ownerId=1,
        recipeId=3,
        comment="Didn't have a waffle maker so i put the bread on a skillet and turned out amazing.",
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment4_owner_1 = Comment(
        ownerId=1,
        recipeId=4,
        comment='I used Japanese BBQ sauce instead of soy and it turned out really well',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment5_owner_1 = Comment(
        ownerId=1,
        recipeId=5,
        comment='Actually added a touch more sugar for the kids, but the recipe as written was great as well!',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment6_owner_1 = Comment(
        ownerId=1,
        recipeId=6,
        comment='Actually added a touch more sugar for the kids, but the recipe as written was great as well!',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment7_owner_1 = Comment(
        ownerId=1,
        recipeId=7,
        comment='So easy, pretty low cost.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment8_owner_1 = Comment(
        ownerId=1,
        recipeId=8,
        comment='Delicious and so easy. followed the recipe exactly and my family, including my picky kiddos love it. It is a staple in our dinner menu.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment9_owner_1 = Comment(
        ownerId=1,
        recipeId=9,
        comment='Easy and great tasting.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    
    comment1_owner_2 = Comment(
        ownerId=2,
        recipeId=1,
        comment='I used Canadian bacon.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment2_owner_2 = Comment(
        ownerId=2,
        recipeId=2,
        comment='This is my first time making crepes EVER btw - thanks for the recipe!💕',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment3_owner_2 = Comment(
        ownerId=2,
        recipeId=3,
        comment='My husband really liked this.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment4_owner_2 = Comment(
        ownerId=2,
        recipeId=4,
        comment="If you aren't into salmon, you can substitute it with any other kind of protein.",
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment5_owner_2 = Comment(
        ownerId=2,
        recipeId=5,
        comment='You can modify this a million ways to simply use what you have on hand.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment6_owner_2 = Comment(
        ownerId=2,
        recipeId=6,
        comment='So yummy.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment7_owner_2 = Comment(
        ownerId=2,
        recipeId=7,
        comment='I used a Beef Chuck Roast cut into 2 inch strips. It was really good.Saved myself a little money Too!',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment8_owner_2 = Comment(
        ownerId=2,
        recipeId=8,
        comment='It was delicious, just as written.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment9_owner_2 = Comment(
        ownerId=2,
        recipeId=9,
        comment='As the recipe states, it is a good restaurant quality recipe.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    
    comment1_owner_3 = Comment(
        ownerId=3,
        recipeId=1,
        comment='Used a bag of mixed cruciferous veggies and carrots',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment2_owner_3 = Comment(
        ownerId=3,
        recipeId=2,
        comment='Taste amazing',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment3_owner_3 = Comment(
        ownerId=3,
        recipeId=3,
        comment='Very good!',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment4_owner_3 = Comment(
        ownerId=3,
        recipeId=4,
        comment='A very fast and easy bowl to make when in a pinch.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment5_owner_3 = Comment(
        ownerId=3,
        recipeId=5,
        comment='substituted dijon mustard for the yellow mustard. Yum!',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment6_owner_3 = Comment(
        ownerId=3,
        recipeId=6,
        comment='I use same ingredients, when done browning keep in pan hot dump a splash of water in pan cover steam for extra flavor',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment7_owner_3 = Comment(
        ownerId=3,
        recipeId=7,
        comment='So delicious!',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment8_owner_3 = Comment(
        ownerId=3,
        recipeId=8,
        comment='I also stir fried some peppers, baby bok Choi, cabbage and onions with sriracha and soy sauce.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    comment9_owner_3 = Comment(
        ownerId=3,
        recipeId=9,
        comment='Either use a lower heat or swap to an oil such as sesame oil that has a higher smoke point.',
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    
    # Owner 1 Comments
    db.session.add(comment1_owner_1)
    db.session.add(comment2_owner_1)
    db.session.add(comment3_owner_1)
    db.session.add(comment4_owner_1)
    db.session.add(comment5_owner_1)
    db.session.add(comment6_owner_1)
    db.session.add(comment7_owner_1)
    db.session.add(comment8_owner_1)
    db.session.add(comment9_owner_1)
    
    # Owner 2 Comments
    db.session.add(comment1_owner_2)
    db.session.add(comment2_owner_2)
    db.session.add(comment3_owner_2)
    db.session.add(comment4_owner_2)
    db.session.add(comment5_owner_2)
    db.session.add(comment6_owner_2)
    db.session.add(comment7_owner_2)
    db.session.add(comment8_owner_2)
    db.session.add(comment9_owner_2)
    
    # Owner 3 Comments
    db.session.add(comment1_owner_3)
    db.session.add(comment2_owner_3)
    db.session.add(comment3_owner_3)
    db.session.add(comment4_owner_3)
    db.session.add(comment5_owner_3)
    db.session.add(comment6_owner_3)
    db.session.add(comment7_owner_3)
    db.session.add(comment8_owner_3)
    db.session.add(comment9_owner_3)

    db.session.commit()
    
    def undo_comments():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM comments"))
            
        db.session.commit()
