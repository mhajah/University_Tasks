import { createContext, useReducer, useState } from "react";
import { IRecipe } from "../types/Recipe.type";
import { recipeReducer } from "./recipeReducer";

export const RecipeContext = createContext<{
    recipes: IRecipe[];
    queryString: string;
    addRecipe: (title: string, content: string) => void;
    removeRecipe: (id: number) => void;
    switchFav: (id: number, isFav: boolean) => void;
    toggleShowdown: () => void;
    searchRecipes: (search:string) => void;
}>({
    recipes: [],
    queryString: "",
    addRecipe: () => {},
    removeRecipe: () => {},
    switchFav: () => {},
    toggleShowdown: () => {},
    searchRecipes: () => {},
});

const initialRecipes: IRecipe[] = [
    { id: 1, title: "Test", content: "Testtt", isFav: false }
]

const RecipeProvider = ({ children }: { children: React.ReactNode }) => {

    const [recipes, dispatch] = useReducer(recipeReducer, initialRecipes);
    const [queryString, setQueryString] = useState("");
    const [showdown, setShowdown] = useState(false);    

    function addRecipe(title: string, content: string) {
        dispatch({ type: "ADD_RECIPE", payload: {title, content} });
    }

    function removeRecipe(id: number) {
        dispatch( { type: "REMOVE_RECIPE", payload: {id} } );
    }

    function switchFav(id: number, isFav: boolean) {
        dispatch( { type: "SWITCH_FAV", payload: {id, isFav} } );
    }

    function toggleShowdown() {
        setShowdown(!showdown);
    }

    function searchRecipes(search: string) {
        setQueryString(search);
    }

    return (
        <RecipeContext.Provider value={{ recipes: showdown ? recipes.filter((recipe: { isFav: any; }) => recipe.isFav) : recipes, queryString, addRecipe, removeRecipe, switchFav, toggleShowdown, searchRecipes }}>
            {children}
        </RecipeContext.Provider>
    );
}


export default RecipeProvider;