from app.models import db, Comment,environment,SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    comment1_owner_1 = Comment(
        owner_id=1,
        recipe_id=1,
        comment='Used a smaller pan, replaced the bacon with sausage patty, prepared, chopped and then added to the base mixture. Added heavy cream 4 tablespoons instead of milk.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment2_owner_1 = Comment(
        owner_id=1,
        recipe_id=2,
        comment='I thought it was a little dry. but it was sooo goood!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment3_owner_1 = Comment(
        owner_id=1,
        recipe_id=3,
        comment="Didn't have a waffle maker so i put the bread on a skillet and turned out amazing.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment4_owner_1 = Comment(
        owner_id=1,
        recipe_id=4,
        comment='I used Japanese BBQ sauce instead of soy and it turned out really well',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment5_owner_1 = Comment(
        owner_id=1,
        recipe_id=5,
        comment='Actually added a touch more sugar for the kids, but the recipe as written was great as well!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment6_owner_1 = Comment(
        owner_id=1,
        recipe_id=6,
        comment='Actually added a touch more sugar for the kids, but the recipe as written was great as well!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment7_owner_1 = Comment(
        owner_id=1,
        recipe_id=7,
        comment='So easy, pretty low cost.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment8_owner_1 = Comment(
        owner_id=1,
        recipe_id=8,
        comment='Delicious and so easy. followed the recipe exactly and my family, including my picky kiddos love it. It is a staple in our dinner menu.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment9_owner_1 = Comment(
        owner_id=1,
        recipe_id=9,
        comment='Easy and great tasting.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    
    comment1_owner_2 = Comment(
        owner_id=2,
        recipe_id=1,
        comment='I used Canadian bacon.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment2_owner_2 = Comment(
        owner_id=2,
        recipe_id=2,
        comment='This is my first time making crepes EVER btw - thanks for the recipe!💕',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment3_owner_2 = Comment(
        owner_id=2,
        recipe_id=3,
        comment='My husband really liked this.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment4_owner_2 = Comment(
        owner_id=2,
        recipe_id=4,
        comment="If you aren't into salmon, you can substitute it with any other kind of protein.",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment5_owner_2 = Comment(
        owner_id=2,
        recipe_id=5,
        comment='You can modify this a million ways to simply use what you have on hand.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment6_owner_2 = Comment(
        owner_id=2,
        recipe_id=6,
        comment='So yummy.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment7_owner_2 = Comment(
        owner_id=2,
        recipe_id=7,
        comment='I used a Beef Chuck Roast cut into 2 inch strips. It was really good.Saved myself a little money Too!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment8_owner_2 = Comment(
        owner_id=2,
        recipe_id=8,
        comment='It was delicious, just as written.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment9_owner_2 = Comment(
        owner_id=2,
        recipe_id=9,
        comment='As the recipe states, it is a good restaurant quality recipe.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    
    comment1_owner_3 = Comment(
        owner_id=3,
        recipe_id=1,
        comment='Used a bag of mixed cruciferous veggies and carrots',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment2_owner_3 = Comment(
        owner_id=3,
        recipe_id=2,
        comment='Taste amazing',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment3_owner_3 = Comment(
        owner_id=3,
        recipe_id=3,
        comment='Very good!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment4_owner_3 = Comment(
        owner_id=3,
        recipe_id=4,
        comment='A very fast and easy bowl to make when in a pinch.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment5_owner_3 = Comment(
        owner_id=3,
        recipe_id=5,
        comment='substituted dijon mustard for the yellow mustard. Yum!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment6_owner_3 = Comment(
        owner_id=3,
        recipe_id=6,
        comment='I use same ingredients, when done browning keep in pan hot dump a splash of water in pan cover steam for extra flavor',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment7_owner_3 = Comment(
        owner_id=3,
        recipe_id=7,
        comment='So delicious!',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment8_owner_3 = Comment(
        owner_id=3,
        recipe_id=8,
        comment='I also stir fried some peppers, baby bok Choi, cabbage and onions with sriracha and soy sauce.',
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    comment9_owner_3 = Comment(
        owner_id=3,
        recipe_id=9,
        comment='Either use a lower heat or swap to an oil such as sesame oil that has a higher smoke point.',
        created_at=datetime.now(),
        updated_at=datetime.now()
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
