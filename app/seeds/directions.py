from app.models import db, Direction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_directions():
    casserole_direction1 = Direction(
        recipeId=1,
        step=1,
        stepInfo='Preheat the oven to 350 degrees F (175 degrees C). Grease a 9x13-inch baking dish.'
    )
    casserole_direction2 = Direction(
        recipeId=1,
        step=2,
        stepInfo='Mix eggs, cheese, bacon, bread, red bell pepper, green onion, milk, garlic, salt, and black pepper together in a bowl until well-combined; pour into the prepared baking dish.'
    )
    casserole_direction3 = Direction(
        recipeId=1,
        step=3,
        stepInfo='Bake in the preheated oven until eggs are set, about 20 to 25 minutes.'
    )
    
    crepe_direction1 = Direction(
        recipeId=2,
        step=1,
        stepInfo='Whisk flour and eggs together in a large mixing bowl; gradually add in milk and water, stirring to combine. Add salt and melted butter; beat until smooth.'
    )
    crepe_direction2 = Direction(
        recipeId=2,
        step=2,
        stepInfo='Heat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each crêpe. Tilt the pan with a circular motion so that the batter coats the surface evenly.'
    )
    crepe_direction3 = Direction(
        recipeId=2,
        step=3,
        stepInfo='Cook until the top of the crêpe is no longer wet and the bottom has turned light brown, 1 to 2 minutes. Run a spatula around the edge of the skillet to loosen the crêpe; flip and cook until the other side has turned light brown, about 1 minute more. Serve hot.'
    )
    
    french_toast_direction1 = Direction(
        recipeId=3,
        step=1,
        stepInfo="Preheat a waffle iron according to the manufacturer's instructions."
    )
    french_toast_direction2 = Direction(
        recipeId=3,
        step=2,
        stepInfo='Whisk milk, eggs, maple syrup, vanilla extract, and salt together in a wide bowl until thoroughly combined. Dip one slice brioche into the bowl and press gently until both sides are coated. Lift bread from the bowl with a slotted spatula, letting any egg mixture drip back into the bowl, and transfer to a rimmed baking sheet. Repeat with remaining bread. Let sit until egg mixture soaks in, about 2 minutes.'
    )
    french_toast_direction3 = Direction(
        recipeId=3,
        step=3,
        stepInfo='Spray the preheated waffle iron with cooking spray. Place one slice brioche onto the waffle iron and gently close the lid without forcing it down. Cook until golden brown and the iron stops steaming, 3 to 5 minutes. Repeat to cook remaining waffles.'
    )
    
    salmon_direction1 = Direction(
        recipeId=4,
        step=1,
        stepInfo='Use a fork to flake salmon onto a microwave-safe plate. Top with rice and place 1 ice cube on top. Cover with a microwave-safe lid and microwave at low power for 30 seconds. Uncover and check temperature. If salmon and rice are not warm enough, cover and return to the microwave for another 30 seconds at low power.'
    )
    salmon_direction2 = Direction(
        recipeId=4,
        step=2,
        stepInfo='Uncover and remove ice cube. Drizzle soy sauce, Sriracha and mayonnaise over the top and toss everything with a fork until well-combined.'
    )
    salmon_direction3 = Direction(
        recipeId=4,
        step=3,
        stepInfo='Garnish with torn pieces of nori, sliced avocado and kimchi.'
    )
    
    sloppy_joe_direction1 = Direction(
        recipeId=5,
        step=1,
        stepInfo='Heat a large skillet over medium heat. Cook and stir lean ground beef in the hot skillet until some of the fat starts to render, 3 to 4 minutes. Add onion and bell pepper; continue to cook until vegetables have softened and beef is cooked through, 3 to 5 more minutes.'
    )
    sloppy_joe_direction2 = Direction(
        recipeId=5,
        step=2,
        stepInfo='Stir in ketchup, brown sugar, mustard, and garlic powder; season with salt and pepper. Reduce heat to low and simmer for 20 to 30 minutes.'
    )
    sloppy_joe_direction3 = Direction(
        recipeId=5,
        step=3,
        stepInfo='Divide meat mixture evenly among hamburger buns.'
    )
    
    reuben_direction1 = Direction(
        recipeId=6,
        step=1,
        stepInfo='Preheat a large griddle or skillet over medium heat.'
    )
    reuben_direction2 = Direction(
        recipeId=6,
        step=2,
        stepInfo='Spread one side of bread slices evenly with Thousand Island dressing. On four bread slices, layer one slice Swiss cheese, 2 slices corned beef, 1/4 cup sauerkraut, and a second slice of Swiss cheese. Top with remaining bread slices, dressing-side down. Butter the top of each sandwich.'
    )
    reuben_direction3 = Direction(
        recipeId=6,
        step=3,
        stepInfo='Place sandwiches, butter-side down on the preheated griddle; butter the top of each sandwich with remaining butter. Grill until both sides are golden brown, about 5 minutes per side. Serve hot.'
    )
    
    stir_fry_direction1 = Direction(
        recipeId=7,
        step=1,
        stepInfo='Gather all ingredients.'
    )
    stir_fry_direction2 = Direction(
        recipeId=7,
        step=2,
        stepInfo='Heat vegetable oil in a large wok or skillet over medium-high heat; cook and stir beef until browned, 3 to 4 minutes.'
    )
    stir_fry_direction3 = Direction(
        recipeId=7,
        step=3,
        stepInfo='Move beef to the side of the wok and add broccoli, bell pepper, carrots, green onion, and garlic to the center of the wok. Cook and stir vegetables for 2 minutes.'
    )
    stir_fry_direction4 = Direction(
        recipeId=7,
        step=4,
        stepInfo='Stir beef into vegetables and season with soy sauce and sesame seeds. Continue to cook and stir until vegetables are tender, about 2 more minutes.'
    )
    stir_fry_direction5 = Direction(
        recipeId=7,
        step=5,
        stepInfo='Serve hot.'
    )
    
    korean_bowl_direction1 = Direction(
        recipeId=8,
        step=1,
        stepInfo='Heat a large skillet over medium-high heat. Add beef and cook, stirring and crumbling into small pieces until browned, 5 to 7 minutes. Drain excess grease.'
    )
    korean_bowl_direction2 = Direction(
        recipeId=8,
        step=2,
        stepInfo='Stir in garlic, ginger, and sesame oil and cook until fragrant, about 2 minutes. Stir in soy sauce, brown sugar, and red pepper. Cook until beef absorbs some sauce, about 7 minutes. Add 1/2 of chopped green onions.'
    )
    korean_bowl_direction3 = Direction(
        recipeId=8,
        step=3,
        stepInfo='Serve over hot cooked rice; garnish with sesame seeds and remaining green onions.'
    )
    
    tuna_steak_direction1 = Direction(
        recipeId=9,
        step=1,
        stepInfo='Pat tuna steaks dry and season on both sides with salt and cayenne pepper.'
    )
    tuna_steak_direction2 = Direction(
        recipeId=9,
        step=2,
        stepInfo='Melt butter in a skillet over medium-high heat.'
    )
    tuna_steak_direction3 = Direction(
        recipeId=9,
        step=3,
        stepInfo='Add olive oil and pepper corns; cook until peppercorns soften and pop, about 5 minutes.'
    )
    tuna_steak_direction4 = Direction(
        recipeId=9,
        step=4,
        stepInfo='Gently place seasoned tuna in the skillet and cook to desired doneness, anywhere from 30 seconds to 1 1/2 minutes per side.'
    )
    tuna_steak_direction5 = Direction(
        recipeId=9,
        step=5,
        stepInfo='Slice tuna into 1/4-inch thick slices to serve.'
    )
    tuna_steak_direction6 = Direction(
        recipeId=9,
        step=6,
        stepInfo='Enjoy!'
    )

    # egg casserole
    db.session.add(casserole_direction1)
    db.session.add(casserole_direction2)
    db.session.add(casserole_direction3)
    
    # crepe
    db.session.add(crepe_direction1)
    db.session.add(crepe_direction2)
    db.session.add(crepe_direction3)

    # french toast
    db.session.add(french_toast_direction1)
    db.session.add(french_toast_direction2)
    db.session.add(french_toast_direction3)
    
    # salmon bowl
    db.session.add(salmon_direction1)
    db.session.add(salmon_direction2)
    db.session.add(salmon_direction3)
    
    # sloppy joe
    db.session.add(sloppy_joe_direction1)
    db.session.add(sloppy_joe_direction2)
    db.session.add(sloppy_joe_direction3)
    
    # reuben sandwich
    db.session.add(reuben_direction1)
    db.session.add(reuben_direction2)
    db.session.add(reuben_direction3)
    
    # beef stir fry
    db.session.add(stir_fry_direction1)
    db.session.add(stir_fry_direction2)
    db.session.add(stir_fry_direction3)
    db.session.add(stir_fry_direction4)
    db.session.add(stir_fry_direction5)

    # korean bowl
    db.session.add(korean_bowl_direction1)
    db.session.add(korean_bowl_direction2)
    db.session.add(korean_bowl_direction3)

    # tuna steak
    db.session.add(tuna_steak_direction1)
    db.session.add(tuna_steak_direction2)
    db.session.add(tuna_steak_direction3)
    db.session.add(tuna_steak_direction4)
    db.session.add(tuna_steak_direction5)
    db.session.add(tuna_steak_direction6)
    
    db.session.commit()

def undo_directions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.directions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM directions")
        
    db.session.commit()
