import StyledSection from "../../StyledSection";

interface IProps {
    services: {
        id: number,
        name: string,
        description: string
    }[]
}

export default function Services({ services }: IProps) {
    return (
        <StyledSection id="services">
          <div className="section-content services">
            <h2>Our Services</h2>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </StyledSection>
    );
}