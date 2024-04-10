import styled from "@emotion/styled";

const StyledSection = styled.section`
    padding: 20px 0;
    color: ${(props) => props.theme.text};

    .section-content {
        max-width: 800px;
        margin: 0 auto;
    }

    h2 {
        font-size: 2.5em;
        margin-bottom: 20px;
        display: inline-block;
    }

    .services {
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
    
        li {
            margin-bottom: 20px;
            text-align: left;
        }
    
        h3 {
            font-size: 1.8em;
            margin-bottom: 10px;
        }
    
        h2 {
            font-size: 2.5em;
            margin-bottom: 20px;
            display: inline-block;
        }
    }
`;

export default StyledSection