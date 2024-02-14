import React, {useState, useEffect} from 'react';
import './my-account.css';
import {jwtDecode} from 'jwt-decode';

 export default function MyAccount() {

  //check token
  if(localStorage.getItem('token')==null){
    window.location.replace('/sign-in');
  }
  const user = jwtDecode(localStorage.getItem('token'));

  //user type
  let userType = '';
  if(user.type_id==1){
    userType = 'an administrator';
  }

  if(user.type_id==2){
    userType = 'a regular user';
  }

  //go to add form
  function handleAddButton(){
    window.location.replace('/add-form');
  }

  //get recipes
  const recipeUrl = 'https://api-recipes.luanabuca.com/recipes/search'
  const [recipes, setRecipes] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'jwt' : localStorage.getItem('token')
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

    //go to edit form
    function handleRecipeEdit(recipeId){
      window.location.replace('/edit-form?recipeId='+recipeId);
    }

    //delete confirmation
    function handleRecipeDelete(id){
      if(window.confirm('Are you sure you want to delete this recipe?') == true){
        // alert('It has been confirmed')
        const optionsDelete = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'jwt': localStorage.getItem('token')
          }
        };
        fetch('https://api-recipes.luanabuca.com/recipes/'+id, optionsDelete)
          .then(response => response.json())
          .then(data => {
            window.location.reload();
          })
          .catch(error => console.log(error));
      }
    }
    

  return (
    <div className='my-account'>

      <h2>My Account</h2>
      <h3 id='hello-text'>Hello {user.name}</h3>
      <button id='add-btn' onClick={handleAddButton}>Add recipe</button>
        <div id='p-div'>
          Here are the recipes you can manage as {userType}.
        </div>

        {recipes.map(recipe => (
            <div id='recipe-box' key={recipe.id}>
                <h4>{recipe.title}</h4>
                {recipe.user && 
                  <div>
                    <p id='recipe-owner'> Added by {recipe.user.name}</p>
                  </div>
                }

                <a id='edit-btn' href={'#'}  onClick={() => handleRecipeEdit(recipe.id)}>Edit</a>
                <a id='delete-btn' href={'#'}  onClick={() => handleRecipeDelete(recipe.id)}>Delete</a>
            </div>
        ))}
    </div>
  )
}

