import classes from "./styles.module.scss"

interface IProps {
    name: string,
    slogan: string,
}

export default function Header({name, slogan}: IProps) {
    return (
        <header id="header" className={`section ${classes.header}`}>
            <div className="header-content">
                <h1>{name}</h1> 
                <p>{slogan}</p>
            </div>
        </header>
    );
}