from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    like1 = Like(
        user_id=1,
        recipe_id=1
    )
    like2 = Like(
        user_id=1,
        recipe_id=2
    )
    like3 = Like(
        user_id=1,
        recipe_id=4
    )
    like4 = Like(
        user_id=1,
        recipe_id=6
    )
    like5 = Like(
        user_id=1,
        recipe_id=8
    )
    like6 = Like(
        user_id=2,
        recipe_id=1
    )
    like7 = Like(
        user_id=2,
        recipe_id=2
    )
    like8 = Like(
        user_id=2,
        recipe_id=4
    )
    like9 = Like(
        user_id=2,
        recipe_id=6
    )
    like10 = Like(
        user_id=2,
        recipe_id=8
    )
    like11 = Like(
        user_id=3,
        recipe_id=1
    )
    like12 = Like(
        user_id=3,
        recipe_id=3
    )
    like13 = Like(
        user_id=3,
        recipe_id=4
    )
    like14 = Like(
        user_id=3,
        recipe_id=6
    )
    like15 = Like(
        user_id=3,
        recipe_id=8
    )

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)
    db.session.add(like13)
    db.session.add(like14)
    db.session.add(like15)
    
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
            
    db.session.commit()
