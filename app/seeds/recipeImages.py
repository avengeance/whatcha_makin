from app.models import db, RecipeImage, environment,SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_recipe_images():
    casserole_image1 = RecipeImage(
        recipe_id=1,
        url='https://www.allrecipes.com/thmb/nXIcXYFyIRve_Kv2aq2opodIeyY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Super-Easy-Egg-Casserole-by-Chef-V-20e2aafba1e046fca31f2e66d5b468e1.jpg'
    )
    casserole_image2 = RecipeImage(
        recipe_id=1,
        url='https://joyfoodsunshine.com/wp-content/uploads/2020/01/egg-casserole-recipe-1.jpg'
    )
    casserole_image3 = RecipeImage(
        recipe_id=1,
        url='https://bellyfull.net/wp-content/uploads/2020/12/Hash-Brown-Egg-Casserole-blog.jpg'
    )
    casserole_image4 = RecipeImage(
        recipe_id=1,
        url='https://www.thespruceeats.com/thmb/gT0xlt99NK323T0ryjiLMf8qT5o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/western-ham-and-egg-casserole-3051850-hero-01-f09584341ec04f558576bbb6e3da24dd.jpg'
    )
    
    crepe_image1 = RecipeImage(
        recipe_id=2,
        url='https://www.allrecipes.com/thmb/UFacd3YjFX_NdQ065n6WjgHYNYI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/16383-basic-crepes-mfs_003-f1033a4dbed74bc2b0d465c8de6026e2.jpg'
    )
    crepe_image2 = RecipeImage(
        recipe_id=2,
        url='https://www.allrecipes.com/thmb/TH3aAKNqug7AZEVobVMcrFLP_84=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8167618-bc270b42467d491e8be7102b4700e691.jpg'
    )
    crepe_image3 = RecipeImage(
        recipe_id=2,
        url='https://joyfoodsunshine.com/wp-content/uploads/2022/03/best-crepes-recipe-1x1-1.jpg'
    )
    crepe_image4 = RecipeImage(
        recipe_id=2,
        url='https://www.foodandwine.com/thmb/8bTxzoqzk7x31ZtH6EWI9SeWXNQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/basic-crepes-FT-RECIPE0920-34a127803e294b47acc8e290892ed98d.jpg'
    )
    
    french_toast_image1 = RecipeImage(
        recipe_id=3,
        url='https://www.allrecipes.com/thmb/VILnXpZhMiqEjMgLDiguu7YMWH0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/3327834-easy-french-toast-waffles-sanzoe-1x1-1-80ab8b28107c470695bdf2d74194b8b8.jpg'
    )
    french_toast_image2 = RecipeImage(
        recipe_id=3,
        url='https://www.simplyrecipes.com/thmb/b48moNCTtaUYEc1Qyxhe9V66XKc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-French-Toast-Lead-Shot-3b-c3a68a576a9548f5bd43cce3d2d7f4b7.jpg'
    )
    french_toast_image3 = RecipeImage(
        recipe_id=3,
        url='https://www.budgetbytes.com/wp-content/uploads/2023/01/French-Toast-syrup-500x375.jpg'
    )
    french_toast_image4 = RecipeImage(
        recipe_id=3,
        url='https://amandascookin.com/wp-content/uploads/2022/10/French-Toast-RCSQ.jpg'
    )
    
    salmon_bowl_image1 = RecipeImage(
        recipe_id=4,
        url='https://www.allrecipes.com/thmb/ZIn_GKfo0SS9P-dcyMEk4s1M1NQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AllrecipesSalmonBowl-1-SaraHaas-4x3-1-58e05b9d5ea94027be97587c8a04a603.jpg'
    )
    salmon_bowl_image2 = RecipeImage(
        recipe_id=4,
        url='https://healthyfitnessmeals.com/wp-content/uploads/2023/01/Southwest-salmon-bowl-7.jpg'
    )
    salmon_bowl_image3 = RecipeImage(
        recipe_id=4,
        url='https://www.eatingbirdfood.com/wp-content/uploads/2021/11/teriyaki-salmon-hero.jpg'
    )
    salmon_bowl_image4 = RecipeImage(
        recipe_id=4,
        url='https://www.asiancaucasian.com/wp-content/uploads/2020/03/Salmon-Sushi-Bowl_550x550.jpg'
    )
    
    sloppy_joe_image1 = RecipeImage(
        recipe_id=5,
        url='https://www.allrecipes.com/thmb/ru7nWSmdrpp4W4JTekJJRluZF30=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/24264-sloppy-joes-dianne-1x1-1-ca246f276afe4196b0ea921df2574466.jpg'
    )
    sloppy_joe_image2 = RecipeImage(
        recipe_id=5,
        url='https://www.allrecipes.com/thmb/66ZG3-WdtZcjLqLITm-tatenwLM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR_GC_SloppyJoes_stills_00686-2000-f7a19e5a6c564a9fbd12ef43d4298a34.jpg'
    )
    sloppy_joe_image3 = RecipeImage(
        recipe_id=5,
        url='https://www.saltandlavender.com/wp-content/uploads/2021/07/sloppy-joe-recipe-1.jpg'
    )
    sloppy_joe_image4 = RecipeImage(
        recipe_id=5,
        url='https://momsdinner.net/wp-content/uploads/2018/01/homemade-sloppy-joe-sauce-and-sandwich.jpg'
    )
    
    reuben_image1 = RecipeImage(
        recipe_id=6,
        url='https://www.allrecipes.com/thmb/BRMuDyugSygcI52IsxkMgZFfxnM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9109692-d1046b5d2ca84f498691b31f9511e460.jpg'
    )
    reuben_image2 = RecipeImage(
        recipe_id=6,
        url='https://natashaskitchen.com/wp-content/uploads/2020/02/Reuben-Sandwich-3.jpg'
    )
    reuben_image3 = RecipeImage(
        recipe_id=6,
        url='https://static01.nyt.com/images/2021/02/09/dining/kc-reuben/kc-reuben-master768.jpg'
    )
    reuben_image4 = RecipeImage(
        recipe_id=6,
        url='https://www.lemonblossoms.com/wp-content/uploads/2021/03/Reuben-Sandwich-S1-500x500.jpg'
    )
    
    stir_fry_image1 = RecipeImage(
        recipe_id=7,
        url='https://www.allrecipes.com/thmb/OxGo7pkjOUWphh-DeA4ySgTUpvA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/228823_QuickBeefStirFry-mfs-Step3-f59503188dcd4fc59db0bffbfad4fe25.jpg'
    )
    stir_fry_image2 = RecipeImage(
        recipe_id=7,
        url='https://www.wellplated.com/wp-content/uploads/2020/05/Beef-Stir-Fry.jpg'
    )
    stir_fry_image3 = RecipeImage(
        recipe_id=7,
        url='https://www.foodnetwork.com/content/dam/images/food/fullset/2015/12/16/3/FNM_010116-Beef-Stir-Fry-Recipe_s4x3.jpg'
    )
    stir_fry_image4 = RecipeImage(
        recipe_id=7,
        url='https://thealmondeater.com/wp-content/uploads/2022/08/beef-stir-fry_web-6.jpg'
    )
    
    korean_image1 = RecipeImage(
        recipe_id=8,
        url='https://www.allrecipes.com/thmb/4PIcvZvGnfgoJvVoQW7lXoLWbG8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/5759837-b2371603be79499c9e1cfa7eeefc7b25.jpg'
    )
    korean_image2 = RecipeImage(
        recipe_id=8,
        url='https://chefsavvy.com/wp-content/uploads/korean-beef-bowl.jpg'
    )
    korean_image3 = RecipeImage(
        recipe_id=8,
        url='https://www.cookingclassy.com/wp-content/uploads/2017/08/korean-beef-bowls-12.jpg'
    )
    korean_image4 = RecipeImage(
        recipe_id=8,
        url='https://princesspinkygirl.com/wp-content/uploads/2020/10/Korean-Beef-Bowl-square-featured.jpg'
    )
    
    tuna_steak_image1 = RecipeImage(
        recipe_id=9,
        url='https://www.allrecipes.com/thmb/rGs4ZpanPC6awzhx6SnHI-IVlsg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/160099-seared-ahi-tuna-steaks-DDMFS-4x3-26f4691e91bd434e9d96c1c601608cbc.jpg'
    )
    tuna_steak_image2 = RecipeImage(
        recipe_id=9,
        url='https://www.acouplecooks.com/wp-content/uploads/2022/04/Tuna-Steak-008d.jpg'
    )
    tuna_steak_image3 = RecipeImage(
        recipe_id=9,
        url='https://www.bowlofdelicious.com/wp-content/uploads/2019/09/Ahi-Tuna-Steaks-square.jpg'
    )
    tuna_steak_image4 = RecipeImage(
        recipe_id=9,
        url='https://pinchandswirl.com/wp-content/uploads/2020/08/Grilled-Tuna-Steaks-sq.jpg'
    )
    
    # Egg Casserole Images
    db.session.add(casserole_image1)
    db.session.add(casserole_image2)
    db.session.add(casserole_image3)
    db.session.add(casserole_image4)
    
    # Crepe Images
    db.session.add(crepe_image1)
    db.session.add(crepe_image2)
    db.session.add(crepe_image3)
    db.session.add(crepe_image4)
    
    # French Toast Images
    db.session.add(french_toast_image1)
    db.session.add(french_toast_image2)
    db.session.add(french_toast_image3)
    db.session.add(french_toast_image4)
    
    # Salmon Bowl Images
    db.session.add(salmon_bowl_image1)
    db.session.add(salmon_bowl_image2)
    db.session.add(salmon_bowl_image3)
    db.session.add(salmon_bowl_image4)
    
    # Sloppy Joe Images
    db.session.add(sloppy_joe_image1)
    db.session.add(sloppy_joe_image2)
    db.session.add(sloppy_joe_image3)
    db.session.add(sloppy_joe_image4)
    
    # Reuben Images
    db.session.add(reuben_image1)
    db.session.add(reuben_image2)
    db.session.add(reuben_image3)
    db.session.add(reuben_image4)
    
    # Stir Fry Images
    db.session.add(stir_fry_image1)
    db.session.add(stir_fry_image2)
    db.session.add(stir_fry_image3)
    db.session.add(stir_fry_image4)
    
    # Korean Images
    db.session.add(korean_image1)
    db.session.add(korean_image2)
    db.session.add(korean_image3)
    db.session.add(korean_image4)
    
    # Tuna Steak Images
    db.session.add(tuna_steak_image1)
    db.session.add(tuna_steak_image2)
    db.session.add(tuna_steak_image3)
    db.session.add(tuna_steak_image4)
    
    db.session.commit()
    
def undo_recipe_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipe_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM recipe_images")
            
    db.session.commit()
