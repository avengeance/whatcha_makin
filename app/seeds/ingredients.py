from app.models import db, Ingredient,environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# adds ingredient seeds

def seed_ingredients():
    egg = Ingredient(
        name='egg', is_seasoning=False
    )
    cheese = Ingredient(
        name='cheese', is_seasoning=False
    )
    bread = Ingredient(
        name='bread', is_seasoning=False
    )
    vegetables = Ingredient(
        name='vegetables', is_seasoning=False
    )
    milk = Ingredient(
        name='milk', is_seasoning=False
    )
    flour = Ingredient(
        name='flour', is_seasoning=False
    )
    water = Ingredient(
        name='water', is_seasoning=False
    )
    brioche = Ingredient(
        name='brioche', is_seasoning=False
    )
    salmon = Ingredient(
        name='salmon', is_seasoning=False
    )
    rice = Ingredient(
        name='rice', is_seasoning=False
    )
    avocado = Ingredient(
        name='avocado', is_seasoning=False
    )
    kimchi = Ingredient(
        name='kimchi', is_seasoning=False
    )
    ground_beef = Ingredient(
        name='ground beef', is_seasoning=False
    )
    buns = Ingredient(
        name='buns', is_seasoning=False
    )
    rye_bread = Ingredient(
        name='rye bread', is_seasoning=False
    )
    swiss_cheese = Ingredient(
        name='swiss cheese', is_seasoning=False
    )
    deli_sliced_beef = Ingredient(
        name='deli sliced beef', is_seasoning=False
    )
    beef_sirloin = Ingredient(
        name='beef sirloin', is_seasoning=False
    )
    broccoli = Ingredient(
        name='broccoli', is_seasoning=False
    )
    carrots = Ingredient(
        name='carrots', is_seasoning=False
    )
    tuna_steak = Ingredient(
        name='tuna steak', is_seasoning=False
    )
    salt = Ingredient(
        name='salt', is_seasoning=True
    )
    pepper = Ingredient(
        name='pepper', is_seasoning=True
    )
    garlic = Ingredient(
        name='garlic', is_seasoning=True
    )
    butter = Ingredient(
        name='butter', is_seasoning=True
    )
    maple_syrup = Ingredient(
        name='maple syrup', is_seasoning=True
    )
    vanilla_extract = Ingredient(
        name='vanilla extract', is_seasoning=True
    )
    cooking_spray = Ingredient(
        name='cooking spray', is_seasoning=True
    )
    soy_sauce = Ingredient(
        name='soy sauce', is_seasoning=True
    )
    hot_sauce = Ingredient(
        name='hot sauce', is_seasoning=True
    )
    mayonaise = Ingredient(
        name='mayonaise', is_seasoning=True
    )
    nori = Ingredient(
        name='nori', is_seasoning=True
    )
    onion = Ingredient(
        name='onion', is_seasoning=True
    )
    green_bell_pepper = Ingredient(
        name='green bell pepper', is_seasoning=True
    )
    ketchup = Ingredient(
        name='ketchup', is_seasoning=True
    )
    brown_sugar = Ingredient(
        name='brown sugar', is_seasoning=True
    )
    mustard = Ingredient(
        name='mustard', is_seasoning=True
    )
    garlic_powder = Ingredient(
        name='garlic powder', is_seasoning=True
    )
    thousand_island_dressing = Ingredient(
        name='thousand island dressing', is_seasoning=True
    )
    sauerkraut = Ingredient(
        name='sauer kraut', is_seasoning=True
    )
    vegetable_oil = Ingredient(
        name='vegetable oil', is_seasoning=True
    )
    red_bell_pepper = Ingredient(
        name='red bell pepper', is_seasoning=True
    )
    seasame_seed = Ingredient(
        name='seasame seed', is_seasoning=True
    )
    ginger = Ingredient(
        name='ginger', is_seasoning=True
    )
    seasame_oil = Ingredient(
        name='seasame oil', is_seasoning=True
    )
    cayenne_spice = Ingredient(
        name='cayenne spice', is_seasoning=True
    )
    olive_oil = Ingredient(
        name='olive oil', is_seasoning=True
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
