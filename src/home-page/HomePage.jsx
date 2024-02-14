import RecipeCategory from "../category/RecipeCategory";
import RecipeItem from "../recipe-item/RecipeItem";
import './home.css'



export default function HomePage(){
    return(
        <div className="page">
            <div className="content">
                <RecipeCategory/>
                <RecipeItem/>
            </div>
        </div>
    );
}
