import { IRecipe } from "../types/Recipe.type";

type RecipeAction = 
    | {
        type: "ADD_RECIPE";
        payload: {
            title: string;
            content: string;
        };
      }
    | {
        type: "REMOVE_RECIPE";
        payload: {
            id: number;
        };
    };

export const recipeReducer = (state: IRecipe[], action: RecipeAction) => {
    console.log(action);
    switch(action.type) {
        case "ADD_RECIPE":
            return [
                ...state,
                {
                    id: Math.random(),
                    title: action.payload.title,
                    content: action.payload.content,
                },
            ];
            
        case "REMOVE_RECIPE":
            return state.filter((recipe) => recipe.id !== action.payload.id);

        default: 
            return state;
    }
}