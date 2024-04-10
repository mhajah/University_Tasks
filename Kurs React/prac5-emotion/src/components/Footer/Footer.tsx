import styled from "@emotion/styled";

interface IProps {
    name: string
}

const FooterSection = styled.div`
    background-color: ${(props) => props.theme.backgroundSection};
    padding: 20px 0;
    text-align: center;
`;


export default function Footer({ name }: IProps) {
    return (
        <FooterSection>
            <div className="section footer-content">
                <p>
                    &copy; {new Date().getFullYear()} {name}
                </p>
            </div>
        </FooterSection>
    );
}