import classes from "./styles.module.scss";
import themeStyles from "../../../themes.module.scss";
import StyledSection from "../../StyledSection";
import styled from "@emotion/styled";

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

const TeamMembers = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const TeamMember = styled.div`
    flex: 0 0 calc(33.33% - 20px);
    padding: 20px;
    margin: 10px;
    text-align: center;
    background: ${(props) => props.theme.backgroundTeam};
    
    img {
        border-radius: 50%;
        margin-bottom: 20px;
    }
    
    h3 {
        margin-bottom: 10px;
        display: inline-block;
    }

`;

export default function TeamCard({teamMembers, theme}: IProps) {
    return (
        <StyledSection id="team" className="section team">
            <div className="section-content">
                <h2>Meet Our Team</h2>
                <TeamMembers>
                    {teamMembers.map((member) => (
                    <TeamMember>
                        <img src={member.image} alt={member.name} />
                        <div>
                        <h3>{member.name}</h3>
                        <p>{member.position}</p>
                        <p>{member.bio}</p>
                        </div>
                    </TeamMember>
                    ))}
                </TeamMembers>
            </div>
        </StyledSection>
    );
}