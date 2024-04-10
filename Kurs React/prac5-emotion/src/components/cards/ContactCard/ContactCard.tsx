import StyledSection from "../../StyledSection";
import styled from "@emotion/styled";

interface IProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}

const ContactSection = styled.div`
  margin-bottom: 40px;

  .contactForm {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;

      background-color: ${(props) => props.theme.contactForm};
      color: ${(props) => props.theme.text};
      border: 1px solid ${(props) => props.theme.borderColor};

      :global(.dark-theme) & {
          background-color: $color-contact-form-dark;
          border: 1px solid $border-color-dark;
      }

      .formGroup {
          margin-bottom: 20px;
      }

      input[type="text"],
      input[type="email"],
      textarea {
          width: calc(100% - 20px);
          padding: 10px;
          border-radius: 5px;
          border: none;
          margin-top: 5px;
          background-color: ${(props) => props.theme.inputColor};
          color: ${(props) => props.theme.text};
          border: 1px solid ${(props) => props.theme.borderColor};
      }

      textarea {
          resize: vertical;
      }

      button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          background-color: ${(props) => props.theme.buttonColor};
          color: ${(props) => props.theme.buttonText};

      }
  }
`;

export default function Contact({ handleSubmit }: IProps) {
    return (
        <StyledSection id="contact" className="section">
          <ContactSection>
            <div className="section-content">
              <h2>Contact Us</h2>
              <form onSubmit={handleSubmit} className="contactForm">
                <div className="formGroup">
                  <input type="text" placeholder="Name" required />
                </div>
                <div className="formGroup">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="formGroup">
                  <textarea rows={5} placeholder="Message" required></textarea>
                </div>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </ContactSection>
        </StyledSection>
    );
}