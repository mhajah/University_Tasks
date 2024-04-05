import classes from "./styles.module.scss"

interface IProps {
    name: string
}

export default function Footer({ name }: IProps) {
    return (
        <footer className={classes.footer}>
            <div className="section footer-content">
                <p>
                    &copy; {new Date().getFullYear()} {name}
                </p>
            </div>
        </footer>
    );
}