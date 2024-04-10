import styled from "@emotion/styled";

interface IProps {
    toggleTheme: () => void,
    darkMode: boolean,
}

const Navigation = styled.div`
    position: sticky;
    top: 0;
    padding: 10px 0;
    text-align: center;
    z-index: 1000;
    background-color: ${(props) => props.theme.background};
    a {
        text-decoration: none;
        padding: 0 20px;
        color: ${(props) => props.theme.text};
    }
`;

const ToggleButton = styled.button`
    cursor: pointer;
    padding: 10px 20px;
    transition: background-color 0.3s ease;

    background-color: ${(props) => props.theme.themeToggleBg};
    color: ${(props) => props.theme.textToggleButton};
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.themeToggleHoverBg};
    }
`;

export default function Navbar({ toggleTheme, darkMode }: IProps) {
    return (
        <Navigation>
            <a href="#header">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
            <ToggleButton onClick={toggleTheme}>
                {darkMode ? "Light Mode" : "Dark Mode"}
            </ToggleButton>
        </Navigation>
    );
}