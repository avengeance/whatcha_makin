from app.models import db, Ingredient,environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# adds ingredient seeds

def seed_ingredients():
    egg = Ingredient(
        name='egg', isSeasoning=False
    )
    cheese = Ingredient(
        name='cheese', isSeasoning=False
    )
    bread = Ingredient(
        name='bread', isSeasoning=False
    )
    vegetables = Ingredient(
        name='vegetables', isSeasoning=False
    )
    milk = Ingredient(
        name='milk', isSeasoning=False
    )
    flour = Ingredient(
        name='flour', isSeasoning=False
    )
    water = Ingredient(
        name='water', isSeasoning=False
    )
    brioche = Ingredient(
        name='brioche', isSeasoning=False
    )
    salmon = Ingredient(
        name='salmon', isSeasoning=False
    )
    rice = Ingredient(
        name='rice', isSeasoning=False
    )
    avocado = Ingredient(
        name='avocado', isSeasoning=False
    )
    kimchi = Ingredient(
        name='kimchi', isSeasoning=False
    )
    ground_beef = Ingredient(
        name='ground beef', isSeasoning=False
    )
    buns = Ingredient(
        name='buns', isSeasoning=False
    )
    rye_bread = Ingredient(
        name='rye bread', isSeasoning=False
    )
    swiss_cheese = Ingredient(
        name='swiss cheese', isSeasoning=False
    )
    deli_sliced_beef = Ingredient(
        name='deli sliced beef', isSeasoning=False
    )
    beef_sirloin = Ingredient(
        name='beef sirloin', isSeasoning=False
    )
    broccoli = Ingredient(
        name='broccoli', isSeasoning=False
    )
    carrots = Ingredient(
        name='carrots', isSeasoning=False
    )
    tuna_steak = Ingredient(
        name='tuna steak', isSeasoning=False
    )
    salt = Ingredient(
        name='salt', isSeasoning=True
    )
    pepper = Ingredient(
        name='pepper', isSeasoning=True
    )
    garlic = Ingredient(
        name='garlic', isSeasoning=True
    )
    butter = Ingredient(
        name='butter', isSeasoning=True
    )
    maple_syrup = Ingredient(
        name='maple syrup', isSeasoning=True
    )
    vanilla_extract = Ingredient(
        name='vanilla extract', isSeasoning=True
    )
    cooking_spray = Ingredient(
        name='cooking spray', isSeasoning=True
    )
    soy_sauce = Ingredient(
        name='soy sauce', isSeasoning=True
    )
    hot_sauce = Ingredient(
        name='hot sauce', isSeasoning=True
    )
    mayonaise = Ingredient(
        name='mayonaise', isSeasoning=True
    )
    nori = Ingredient(
        name='nori', isSeasoning=True
    )
    onion = Ingredient(
        name='onion', isSeasoning=True
    )
    green_bell_pepper = Ingredient(
        name='green bell pepper', isSeasoning=True
    )
    ketchup = Ingredient(
        name='ketchup', isSeasoning=True
    )
    brown_sugar = Ingredient(
        name='brown sugar', isSeasoning=True
    )
    mustard = Ingredient(
        name='mustard', isSeasoning=True
    )
    garlic_powder = Ingredient(
        name='garlic powder', isSeasoning=True
    )
    thousand_island_dressing = Ingredient(
        name='thousand island dressing', isSeasoning=True
    )
    sauerkraut = Ingredient(
        name='sauer kraut', isSeasoning=True
    )
    vegetable_oil = Ingredient(
        name='vegetable oil', isSeasoning=True
    )
    red_bell_pepper = Ingredient(
        name='red bell pepper', isSeasoning=True
    )
    seasame_seed = Ingredient(
        name='seasame seed', isSeasoning=True
    )
    ginger = Ingredient(
        name='ginger', isSeasoning=True
    )
    seasame_oil = Ingredient(
        name='seasame oil', isSeasoning=True
    )
    cayenne_spice = Ingredient(
        name='cayenne spice', isSeasoning=True
    )
    olive_oil = Ingredient(
        name='olive oil', isSeasoning=True
    )
    
    # none seasonings
    db.session.add(egg)
    db.session.add(cheese)
    db.session.add(bread)
    db.session.add(vegetables)
    db.session.add(flour)
    db.session.add(milk)
    db.session.add(water)
    db.session.add(brioche)
    db.session.add(salmon)
    db.session.add(rice)
    db.session.add(avocado)
    db.session.add(kimchi)
    db.session.add(ground_beef)
    db.session.add(buns)
    db.session.add(rye_bread)
    db.session.add(swiss_cheese)
    db.session.add(deli_sliced_beef)
    db.session.add(beef_sirloin)
    db.session.add(broccoli)
    db.session.add(carrots)
    db.session.add(tuna_steak)
    
    # seasonings
    db.session.add(salt)
    db.session.add(pepper)
    db.session.add(garlic)
    db.session.add(butter)
    db.session.add(maple_syrup)
    db.session.add(vanilla_extract)
    db.session.add(cooking_spray)
    db.session.add(soy_sauce)
    db.session.add(hot_sauce)
    db.session.add(mayonaise)
    db.session.add(nori)
    db.session.add(onion)
    db.session.add(green_bell_pepper)
    db.session.add(ketchup)
    db.session.add(brown_sugar)
    db.session.add(mustard)
    db.session.add(garlic_powder)
    db.session.add(thousand_island_dressing)
    db.session.add(sauerkraut)
    db.session.add(vegetable_oil)
    db.session.add(red_bell_pepper)
    db.session.add(seasame_seed)
    db.session.add(ginger)
    db.session.add(seasame_oil)
    db.session.add(cayenne_spice)
    db.session.add(olive_oil)
    
    
    db.session.commit()

    def undo_ingredients():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
        else:
            db.session.execute("DELETE FROM ingredients")
        
        db.session.commit()
