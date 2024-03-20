import { createContext, useReducer } from "react";
import { IRecipe } from "../types/Recipe.type";
import { recipeReducer } from "./recipeReducer";


export const RecipeContext = createContext<{
    recipes: IRecipe[];
    addRecipe: (title: string, content: string) => void;
    removeRecipe: (id: number) => void;
}>({
    recipes: [],
    addRecipe: () => {},
    removeRecipe: () => {}
});

const initialRecipes: IRecipe[] = [
    { id: 1, title: "Twój przepis", content: "Skorzystaj z formularza, aby dodać swój ulubiony przepis. "}
]

const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [recipes, dispatch] = useReducer(recipeReducer, initialRecipes);

    function addRecipe(title: string, content: string) {
        dispatch({ type: "ADD_RECIPE", payload: {title, content} });
    }

    function removeRecipe(id: number) {
        dispatch( { type: "REMOVE_RECIPE", payload: {id} } )
    }

    return (
        <RecipeContext.Provider value={{ recipes, addRecipe, removeRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
}


export default RecipeProvider;