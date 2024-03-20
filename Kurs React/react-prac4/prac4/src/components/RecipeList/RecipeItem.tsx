import useRecipe from "../../providers/useRecipe";
import { IRecipe } from "../../types/Recipe.type";

interface IProps {
    recipe: IRecipe;
}

export default function RecipeItem( { recipe }:IProps ) {

    return (
        <div className="recipeItem">
            <p> {recipe.title} </p>
            <p> {recipe.content} </p>
        </div>
    );
}