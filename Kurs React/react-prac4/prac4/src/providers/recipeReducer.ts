import { Reducer, useState } from "react";
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
      }
    | {
        type: "SEARCH_RECIPES";
        payload: {
            search: string;
        }
      };

export const recipeReducer = (state: IRecipe[], action: RecipeAction) => {

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
                        isFav: !recipe.isFav
                    };
                } else {
                    return recipe;
                }
            });


        default: 
            return state;
    }
}