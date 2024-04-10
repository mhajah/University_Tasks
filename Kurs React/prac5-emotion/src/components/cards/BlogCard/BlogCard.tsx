import StyledSection from "../../StyledSection";
import styled from "@emotion/styled";

interface IProps {
    blogPosts: {
        id: number,
        title: string,
        date: string,
        content: string
    }[]
}


const BlogPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const BlogPost = styled.div`
  border-radius: 10px;
  padding: 20px;
  text-align: left;

  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  
  h3 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
  }

  button {
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    transition: background-color 0.3s ease;

    background-color: #4caf50;
    color: #fff;
  }

  button:hover {
    background-color: #45a049;
  }
`;

export default function TeamCard({blogPosts}: IProps) {
    return (
        <StyledSection id="blog" className="section">
          <div className="section-content">
            <h2>Latest Blog Posts</h2>
            <BlogPosts>
              {blogPosts.map((post) => (
                <BlogPost>
                  <h3>{post.title}</h3>
                  <p>{post.date}</p>
                  <p>{post.content}</p>
                  <button>Read More</button>
                </BlogPost>
              ))}
            </BlogPosts>
          </div>
        </StyledSection>
    );
}