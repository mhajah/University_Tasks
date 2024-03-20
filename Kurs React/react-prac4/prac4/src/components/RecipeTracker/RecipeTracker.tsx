import useRecipe from "../../providers/useRecipe";
import AddRecipeForm from "../AddRecipeForm/AddRecipeForm";
import RecipeList from "../RecipeList/RecipeList";

export default function RecipeTracker() {
    const { recipes } = useRecipe();

    return (
        <div className="recipe-tracker">
            <AddRecipeForm />
            <RecipeList />
        </div>
    );
}