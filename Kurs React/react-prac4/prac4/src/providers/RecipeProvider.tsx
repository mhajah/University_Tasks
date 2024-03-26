import { createContext, useReducer, useState } from "react";
import { IRecipe } from "../types/Recipe.type";
import { recipeReducer } from "./recipeReducer";

export const RecipeContext = createContext<{
    recipes: IRecipe[];
    queryString: string;
    addRecipe: (title: string, content: string, isFav: boolean) => void;
    removeRecipe: (id: number) => void;
    switchFav: (id: number, isFav: boolean) => void;
    toggleShowdown: () => void;
    searchRecipes: (search:string) => void;
}| undefined>(undefined);

const initialRecipes: IRecipe[] = [
    { id: 1, title: "Płatki na mleku", content: "Aby wykonać pyszne płatki na mleku weź miskę, dodaj mleka, a następnie wsyp ulubione płatki", isFav: false },
    { id: 2, title: "Kanapka z szynką", content: "Na ulubiony chleb połóż ulubioną szynkę. Opcjonalnie: posmaruj chleb masłem.", isFav: false },
    { id: 3, title: "Płatki z jogurtem", content: "Aby wykonać pyszne płatki z jogurtem weź miskę, dodaj jogurt, a następnie wsyp ulubione płatki", isFav: false },
    { id: 4, title: "Spaghetti napoli", content: "Ugotuj makaron zgodnie z instrukcją na opakowaniu. Dodaj passatę pomidorową i gotowe!", isFav: true },
    { id: 5, title: "Sałatka z kurczakiem", content: "Usmaż kurczaka, podaj z sałatą lodową i ulubionym sosem.", isFav: false }
]

const RecipeProvider = ({ children }: { children: React.ReactNode }) => {

    const [recipes, dispatch] = useReducer(recipeReducer, initialRecipes);
    const [queryString, setQueryString] = useState("");
    const [showdown, setShowdown] = useState(false);    

    function addRecipe(title: string, content: string, isFav: boolean) {
        dispatch({ type: "ADD_RECIPE", payload: {title, content, isFav} });
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