import { useState } from "react";
import useRecipe from "../../providers/useRecipe";

export default function AddRecipeForm() {

    const { searchRecipes } = useRecipe();
    const [inputSearch, setInputSearch] = useState("");

    return (
        <form className='searchForm'
            onSubmit={(e) => {
            e.preventDefault();
            searchRecipes(inputSearch);
            }}>
            <input value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
}