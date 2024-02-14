import React from 'react';
import { useState, useEffect } from 'react';
import './recipe-page.css'

export default function RecipePage() {
  //change url to get a specific recipe
  const queryParameters = new URLSearchParams(window.location.search)
  const recipe_id = queryParameters.get('recipe_id')

  const recipeUrl = 'https://api-recipes.luanabuca.com/recipes/public/'+recipe_id;

  //get recipe details
  const [recipe, setRecipe] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  useEffect(() => {
    fetch(recipeUrl, options)
     .then(response => response.json())
     .then(data => {
      setRecipe(data['payload']['recipe']);
     })
     .catch(error => console.error(error));
  }, [])

  return (
   <div className='recipe-container'>
    <a href="/">&larr; Go back to home page</a>
    <h1>{recipe.title}</h1>
    <ul>
      <li>Category: {recipe.category && 
        <a href={"#"} onClick={() => window.location.replace('/?category_id='+recipe.category.id)}>{recipe.category.name}</a>
      }</li>
      <li>Author: {recipe.user && recipe.user.name}</li>
      <li>Complexity: {recipe.complexity}</li>
    </ul>
    <img id='recipe-img' src={recipe.image} alt='recipe photo' width='100%'/>
    {recipe.description && 
        <div id='recipe-description'>
          {recipe.description.split('\n').map(str => <p>{str}</p>)}
        </div>
    }
   </div>
  )
}
