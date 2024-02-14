import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './recipe-cat.css';


export default function RecipeCategory(){
  //gets recipes from that category
  function handleCategoryclick(categoryId){
    window.location.replace('/?category_id='+categoryId);
  }

  //get categories
  const [categories, setCategories] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  useEffect(() => {
    fetch('https://api-recipes.luanabuca.com/categories/search', options)
    .then(response => response.json())
    .then(data => {
      setCategories(data['payload']['categories']);
    })
    .catch(error => console.log(error));
  }, []);

  return (
    
    <div className="recipe_category">
      <h3>Recipe Categories</h3>
      <ul className='recipe-list'>
        {categories.map(category => (
          <li className='recipe-list-i' key={category.id}><a href="#" onClick={() => handleCategoryclick(category.id)}>{category.name} ({category.recipe_count})</a></li>
        ))}
        </ul>
      </div>
  )
}

