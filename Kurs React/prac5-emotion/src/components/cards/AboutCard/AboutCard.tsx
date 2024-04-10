import StyledSection from '../../StyledSection';

interface IProps {
    about: string
}

export default function TeamCard({about}: IProps) {
    return (
        <StyledSection id="about" className="section">
          <div className="section-content">
            <h2>About Us</h2>
            <p>{about}</p>
          </div>
        </StyledSection>
    );
}