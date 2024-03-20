import useRecipe from "../../providers/useRecipe";
import { IRecipe } from "../../types/Recipe.type";

interface IProps {
    recipe: IRecipe;
}

export default function RecipeItem( { recipe }:IProps ) {

    const { removeRecipe } = useRecipe();
    const { switchFav } = useRecipe();

    return (
        <div className={ recipe.isFav ? "recipeItem favoriteItem" : "recipeItem" }
        onClick={()=> switchFav(recipe.id, recipe.isFav)}>
            <p> {recipe.title} </p>
            <p> {recipe.content} </p>
            <button className="removeItem" onClick={()=> removeRecipe(recipe.id)}>
                Delete
            </button>
        </div>
    );
}