import { Reducer } from "react";
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
      }
    | {
        type: "SWITCH_FAV";
        payload: {
            id: number;
            isFav: boolean;
        };
      };

export const recipeReducer: Reducer<any,any> = (state: IRecipe[], action: RecipeAction) => {
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

        case "SWITCH_FAV":
            return state.map((recipe) => {
                if (recipe.id === action.payload.id) {
                    return {
                        ...recipe,
                        isFav: !recipe.isFav // Zmiana wartości isFav na przeciwną
                    };
                } else {
                    return recipe;
                }
            });

        default: 
            return state;
    }
}