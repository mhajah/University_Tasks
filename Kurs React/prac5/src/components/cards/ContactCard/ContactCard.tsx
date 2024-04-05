import classes from "./styles.module.scss";

interface IProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}

export default function Contact({ handleSubmit }: IProps) {
    return (
        <section id="contact" className={`section ${classes.contact}`}>
          <div className="section-content">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className={classes.contactForm}>
              <div className={classes.formGroup}>
                <input type="text" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <textarea rows={5} placeholder="Message" required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>
    );
}