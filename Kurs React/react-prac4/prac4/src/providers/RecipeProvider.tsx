import { createContext, useReducer } from "react";
import { IRecipe } from "../types/Recipe.type";
import { recipeReducer } from "./recipeReducer";


export const RecipeContext = createContext<{
    recipes: IRecipe[];
    addRecipe: (title: string, content: string) => void;
    removeRecipe: (id: number) => void;
    switchFav: (id: number, isFav: boolean) => void;
}>({
    recipes: [],
    addRecipe: () => {},
    removeRecipe: () => {},
    switchFav: () => {},
});

const initialRecipes: IRecipe[] = [
    { id: 1, title: "Test", content: "Testtt", isFav: false }
]

const RecipeProvider = ({ children }: { children: React.ReactNode }) => {

    const [recipes, dispatch] = useReducer(recipeReducer, initialRecipes);

    function addRecipe(title: string, content: string) {
        dispatch({ type: "ADD_RECIPE", payload: {title, content} });
    }

    function removeRecipe(id: number) {
        dispatch( { type: "REMOVE_RECIPE", payload: {id} } );
    }

    function switchFav(id: number, isFav: boolean) {
        dispatch( { type: "SWITCH_FAV", payload: {id, isFav} } );
    }

    return (
        <RecipeContext.Provider value={{ recipes, addRecipe, removeRecipe, switchFav }}>
            {children}
        </RecipeContext.Provider>
    );
}


export default RecipeProvider;