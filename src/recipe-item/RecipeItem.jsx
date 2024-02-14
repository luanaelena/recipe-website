import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './recipe-item.css'

export default function RecipeItem() {

    //go to a specific recipe's page
    function handleRecipeClick(recipeId){
        window.location.replace('/recipe?recipe_id='+recipeId);
    }

    //listing title and url based on selected category
    const queryParameters = new URLSearchParams(window.location.search)
    const categoryId = queryParameters.get('category_id')

    let listingtitle = '';
    let recipeUrl = '';
    
    if(categoryId==null){
        listingtitle = 'Latest recipes';
        recipeUrl = 'https://api-recipes.luanabuca.com/recipes/public/search?limit=5';
    }else{
        listingtitle = 'Recipes for selected category';
        recipeUrl = 'https://api-recipes.luanabuca.com/recipes/public/search?limit=-1&category_id='+categoryId;
    }

    //get recipe details for listing
    const [recipes, setRecipes] = useState([]);

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
        setRecipes(data['payload']['recipes']);
      })
      .catch(error => console.log(error));
    }, []);

  return (
    <div id='recipe-item-container'>
        <h2 className='list-title'>{listingtitle}</h2>

        {recipes.map(recipe => (
            <div className='recipe-list-item' key={recipe.id}>
                <h4>{recipe.title}</h4>
                <img src={recipe.image} width='200px' alt='recipe photo'/>
                <div id='listing-p'>
                  <p>{recipe.description}</p>
                </div>
                <a id='listing-a' href={'#'} key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>read more</a>
            </div>
        ))}
    </div>
  )
}

