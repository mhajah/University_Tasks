import classes from "./styles.module.scss";

interface IProps {
    services: {
        id: number,
        name: string,
        description: string
    }[]
}

export default function Services({ services }: IProps) {
    return (
        <section id="services" className={`section ${classes.services}`}>
          <div className="section-content">
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
        </section>
    );
}