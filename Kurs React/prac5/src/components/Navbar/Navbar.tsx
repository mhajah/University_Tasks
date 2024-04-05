import classes from "./styles.module.scss"

interface IProps {
    toggleTheme: () => void,
    darkMode: boolean,
}

export default function Navbar({ toggleTheme, darkMode }: IProps) {
    return (
        <div className={`${classes.navbar}`}>
            <a href="#header">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
            <button onClick={toggleTheme} className="theme-toggle-button">
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </div>
    );
}