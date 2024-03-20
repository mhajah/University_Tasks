import useRecipe from "../../providers/useRecipe";
import RecipeItem from "./RecipeItem";

export default function RecipeList() {
    const { recipes } = useRecipe();
    return (
        <div className="recipeList">
            {recipes.map((recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}
