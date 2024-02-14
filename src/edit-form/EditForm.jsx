import React, {useState, useEffect} from "react"; 
import './edit-form.css';

export default function EditForm(){
    //check token
    if(localStorage.getItem('token')==null){
        window.location.replace('/sign-in');
    }

    const queryParameters = new URLSearchParams(window.location.search)
    const recipe_id = queryParameters.get("recipeId")


    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeImage, setRecipeImage] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [recipeComplexity, setRecipeComplexity] = useState(0);
    const [recipeCategoryId, setRecipeCategoryId] = useState(0);

    const [recipeError, setRecipeError] = useState("");

    //getting the categories
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
                    //console.log(data["payload"]["categories"]);
                    setCategories(data["payload"]["categories"]);
                })
                .catch(error => console.error(error));
        }, []) 


    //getting the recipe data
    const recipeUrl = "https://api-recipes.luanabuca.com/recipes/"+recipe_id;

    const [recipe, setRecipe] = useState([]);

    const optionsRecipe = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'jwt': localStorage.getItem("token")
        }
    };

    useEffect(() => {
            fetch(recipeUrl, optionsRecipe)
                .then(response => response.json())
                .then(data => {
                    setRecipe(data["payload"]["recipe"]);
                })
                .catch(error => console.error(error));

        }, []) 


    function handleRecipeUpdate(){
        let uRecipeTitle = document.getElementById("recipe-title").value;
        let uRecipeImage = document.getElementById("image").value;
        let uRecipeDescription = document.getElementById("description").value;
        let uRecipeComplexity = document.getElementById("complexity").value;
        let uRecipeCategoryId = document.getElementById("category_id").value;

        let errFound = false;
        let errDetails = "";

        //doing form validation
        if(uRecipeTitle==""){
            errFound = true;
            errDetails = errDetails + 'Title field can not be empty\n'
        }
        if(uRecipeImage==""){
            errFound = true;
            errDetails = errDetails + "Image field can not be empty\n"
        }
        if(uRecipeDescription==""){
            errFound = true;
            errDetails = errDetails + "Description field can not be empty\n"
        }
        if(uRecipeComplexity==0){
            errFound = true;
            errDetails = errDetails + "Please choose the complexity\n"
        }
        if(uRecipeCategoryId==0){
            errFound = true;
            errDetails = errDetails + "Please choose a category\n"
        }

        if(errFound){
            //handle form error
            setRecipeError(errDetails);
        }else{
            //saving the recipe and return to recipe list (my account)

            const recipeUpdate = {
                title: uRecipeTitle,
                image: uRecipeImage,
                description: uRecipeDescription,
                complexity: uRecipeComplexity,
                category_id: uRecipeCategoryId
            };
            console.log('title is: '+ uRecipeTitle);
            console.log(JSON.stringify(recipeUpdate))
            const optionsUpdate = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt': localStorage.getItem("token")
                },
                body: JSON.stringify(recipeUpdate)
            };



            fetch('https://api-recipes.luanabuca.com/recipes/'+recipe_id, optionsUpdate)
                .then(response => response.json())
                .then(data => {
                    if(data["error"]==0){
                        window.location.replace("/my-account");
                    }
                })
                .catch(error => console.error(error));

        }

    }

    return(
        <div className="edit-form">
            <a href="/my-account">&larr; Go back to my account</a>
            <h2 id="edit-title">Edit this recipe</h2>
            <div className="error-message">{recipeError}</div>

            <div className="form">

                <label htmlFor="recipe-title">Recipe title</label>
                <input type="text" id="recipe-title" className="form-item" placeholder="Recipe title" defaultValue={recipe.title}/>

                <label htmlFor="description">General description</label>
                <p className='parag'><small>Here you will have to type a few words about your recipe, it's ingredients, and steps of your delicious recipe.</small></p>
                <textarea id="description" className="form-item" defaultValue={recipe.description} ></textarea>

                <label htmlFor="image">Image link</label>
                <input type="url" id="image" className="form-item" placeholder="Image link" defaultValue={recipe.image}/>

                {categories && recipe.category &&
                    <div>
                        <label htmlFor="category_id">Category</label>
                        <select id="category_id" className="form-item" defaultValue={recipe.category.id}>
                            <option value={0}>--Choose category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                }
                
                {recipe.complexity &&
                <div>
                <label htmlFor="complexity">Complexity</label>
                <select id="complexity" className="form-item" defaultValue={recipe.complexity}>
                    <option value={0}>--Choose complexity</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                </div>
                 }

                <button id="edit-form-btn" type="submit" onClick={handleRecipeUpdate}>Update Recipe</button>
            </div>
        </div>
    )
}
