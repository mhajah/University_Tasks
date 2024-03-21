import useRecipe from "../../providers/useRecipe";
import AddRecipeForm from "../RecipeForms/AddRecipeForm";
import RecipeList from "../RecipeList/RecipeList";
import SearchForm from "../../components/RecipeForms/SearchForm"

export default function RecipeTracker() {
    const { recipes } = useRecipe();

    return (
        <div className="recipe-tracker">
            <SearchForm />
            <AddRecipeForm />
            <RecipeList />
        </div>
    );
}