import useRecipe from "../../providers/useRecipe";
import RecipeItem from "./RecipeItem";

export default function RecipeList() {
    const { recipes } = useRecipe();
    const { queryString } = useRecipe();
    return (
        <div className="recipeList">
            {recipes
            .filter((recipe) => {
                const content = recipe.content.toLowerCase();
                const title = recipe.title.toLowerCase();
                const queryStringLowerCase = queryString.toLowerCase();
                return content.includes(queryStringLowerCase) || title.includes(queryStringLowerCase);
              })
            .map((recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}
