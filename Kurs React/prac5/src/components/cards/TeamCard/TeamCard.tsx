import classes from "./styles.module.scss";
import themeStyles from "../../../themes.module.scss";

interface IProps {
    teamMembers: {
        id: number,
        name: string,
        position: string,
        bio: string,
        image: string
    }[],
    theme: boolean
}

export default function TeamCard({teamMembers, theme}: IProps) {
    const themeClass = theme === false ? themeStyles.lightTheme : themeStyles.darkTheme;
    return (
        <section id="team" className="section team">
        <div className="section-content">
            <h2>Meet Our Team</h2>
            <div className={`${classes.teamMembers}`}>
                {teamMembers.map((member) => (
                <div key={member.id} className={`${classes.teamMember} ${themeClass}`}>
                    <img src={member.image} alt={member.name} />
                    <div>
                    <h3>{member.name}</h3>
                    <p>{member.position}</p>
                    <p>{member.bio}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </section>
    );
}