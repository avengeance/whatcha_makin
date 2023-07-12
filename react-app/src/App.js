import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

// import { authenticate } from "./store/session";
import * as RecipeActions from "./store/recipes";
import * as SessionActions from "./store/session";


import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";

import Recipe from "./components/Recipe";
import RecipeDetail from "./components/RecipeDetail";

import CreateRecipe from "./components/CreateRecipe";
import UpdateRecipe from "./components/UpdateRecipe";

import UserRecipes from "./components/UserRecipe";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(SessionActions.authenticate()).then(() => setIsLoaded(true));
    dispatch(RecipeActions.getAllRecipesThunk());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <Recipe />
          </Route>
          <Route exact path="/recipes/new">
            <CreateRecipe />
          </Route>
          <Route exact path="/users/:userId/recipes">
            <UserRecipes />
          </Route>
          <Route exact path="/recipes/:recipeId/edit">
            <UpdateRecipe />
          </Route>
          <Route path='/recipes/:recipeId'>
            <RecipeDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
