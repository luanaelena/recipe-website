import React, {useState, useEffect} from "react"; 
import './add-form.css';

export default function AddForm(){

  //check token
  if(localStorage.getItem('token')==null){
    window.location.replace('/sign-in');
  }

  //get data
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeComplexity, setRecipeComplexity] = useState(0);
  const [recipeCategoryId, setRecipeCategoryId] = useState(0);

  const [recipeError, setRecipeError] = useState(''); 

  //submit
  function handleSubmit(){
    let errFound = false;
    let errDetails = '';

    //validating form
    if(recipeTitle==''){
      errFound = true;
      errDetails = errDetails + 'Title field cannot be empty\n'
    }
    if(recipeImage==""){
      errFound = true;
      errDetails = errDetails + "Image field cannot be empty\n"
    }
    if(recipeDescription==""){
      errFound = true;
      errDetails = errDetails + "Description field cannot be empty\n"
    }
    if(recipeComplexity==0){
      errFound = true;
      errDetails = errDetails + "Please choose the complexity\n"
    }
    if(recipeCategoryId==0){
      errFound = true;
      errDetails = errDetails + "Please choose a category\n"
    }

    if(errFound){
      //handle form error
      setRecipeError(errDetails);
    }else{
      //saving the recipe and return to my account

      const recipeAdd = {
        title: recipeTitle,
        image: recipeImage,
        description: recipeDescription,
        complexity: recipeComplexity,
        category_id: recipeCategoryId
      };

      const optionsPost = {
        method: 'POST',
        body: JSON.stringify(recipeAdd),
        headers: {
          'Content-Type': 'application/json',
          'jwt': localStorage.getItem('token')
        }
      };

      fetch('https://api-recipes.luanabuca.com/recipes', optionsPost)
                .then(response => response.json())
                .then(data => {
                    if(data["error"]==0){
                        window.location.replace("/my-account");
                    }
                })
                .catch(error => console.error(error));
    }
    
  };

//get categories
  const [categories, setCategories] =useState([]);
    const optionsGet = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    useEffect(() => {
      fetch('https://api-recipes.luanabuca.com/categories/search', optionsGet)
     .then(response => response.json())
     .then(data => {
      setCategories(data['payload']['categories']);
     })
     .catch(error => console.error(error));
    }, []);

  return (
    <div className='add-form'>
        <a href="/my-account">&larr; Go back to my account</a>
        <h2 id='form-title'>Add a new recipe</h2>
        <div className="error-message">{recipeError}</div>

        <div className='form'>
            {/* titlu */}
            <label htmlFor="title">Recipe title</label>
            <input id='recipe-title' className='form-item' type="text" placeholder='Recipe title'  onChange={(e) => setRecipeTitle(e.target.value)}/>

            {/* descriere generala a retetei */}
            <label htmlFor="description">General description</label>
            <p className='parag'><small>Here you will have to type a few words about your recipe, it's ingredients, and steps of your delicious recipe.</small></p>
            <textarea id="description" className='form-item' onChange={(e) => setRecipeDescription(e.target.value)}></textarea>

            {/* img link */}
            <label htmlFor="image">Image link</label>
            <input id='image' className='form-item' type="url" placeholder='Image link' onChange={(e) => setRecipeImage(e.target.value)}/>

            {/* category type */}
            <label htmlFor="category_id">Category</label>
            <select id="category_id" className='form-item' defaultValue={0} onChange={(e) => setRecipeCategoryId(e.target.value)}>
              <option value={0}>--Choose category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            {/* complexity level */}
            <label htmlFor="complexity">Complexity</label>
            <select id='complexity' className='form-item' defaultValue={0} onChange={(e) => setRecipeComplexity(e.target.value)}>
              <option value={0}>--Choose complexity</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            {/* button de add reteta */}
            <button id='add-btn' type='submit' onClick={handleSubmit}>Add Recipe</button>

        </div>
    </div>
  )
}