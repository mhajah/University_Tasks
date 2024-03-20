import { useState } from "react";
import useRecipe from "../../providers/useRecipe";

export default function AddRecipeForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    const { addRecipe } = useRecipe();

    return (
        <div
            className="AddRecipeForm"
            onSubmit={(e) => {
                e.preventDefault();
                if (title.trim() == "" || content.trim() == "") {
                    setError(true);
                    return;
                }
                addRecipe(title, content);
                setTitle("");
                setContent("");
                setError(false);
            }}
        >
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
            {error && <p className="error">Error</p>}
        </form>

        </div>
    )
}