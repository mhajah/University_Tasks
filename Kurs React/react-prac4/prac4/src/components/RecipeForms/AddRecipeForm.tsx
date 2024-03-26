import { useState } from "react";
import useRecipe from "../../providers/useRecipe";

export default function AddRecipeForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    const { addRecipe } = useRecipe();
    const { toggleShowdown } = useRecipe();

    return (
        
        <div
            className="AddRecipeForm"
            onSubmit={(e) => {
                e.preventDefault();
                if (title.trim() == "" || content.trim() == "") {
                    setError(true);
                    return;
                }
                addRecipe(title, content, false);
                setTitle("");
                setContent("");
                setError(false);
            }}
        >
            <h3>Dodaj przepis</h3>
            {error && <p className="error">Musisz tytuł i treść przepisu!!!</p>}
            <div className="RecipeWrapper">  
                <form>
                    <input
                    type="text"
                    placeholder="Tytuł przepisu"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                    type="text"
                    placeholder="Treść przepisu"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit">Dodaj przepis</button>
                </form>
                <button onClick={ () => toggleShowdown() }>TOGGLE</button>
            </div>
        </div>
    )
}