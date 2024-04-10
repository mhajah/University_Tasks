import styled from "@emotion/styled";

interface IProps {
    name: string,
    slogan: string,
}

const HeaderSection = styled.div`
    padding: 50px 0;
    text-align: center;

    h1 {
        font-size: 3em;
        margin-bottom: 10px;
    }

    p {
        font-size: 1.5em;
    }
`;

export default function Header({name, slogan}: IProps) {
    return (
        <HeaderSection id="header">
            <div className="header-content">
                <h1>{name}</h1> 
                <p>{slogan}</p>
            </div>
        </HeaderSection>
    );
}