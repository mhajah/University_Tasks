import classes from "./styles.module.scss"

interface IProps {
    about: string
}

export default function TeamCard({about}: IProps) {
    return (
        <section id="about" className={classes.section}>
          <div className={classes.sectionContent}>
            <h2>About Us</h2>
            <p>{about}</p>
          </div>
        </section>
    );
}