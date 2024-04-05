import classes from "./styles.module.scss";

interface IProps {
    blogPosts: {
        id: number,
        title: string,
        date: string,
        content: string
    }[]
}

export default function TeamCard({blogPosts}: IProps) {
    return (
        <section id="blog" className="section">
          <div className="section-content">
            <h2>Latest Blog Posts</h2>
            <div className={classes.blogPosts}>
              {blogPosts.map((post) => (
                <div key={post.id} className={`${classes.blogPost} ${classes.lightTheme}`}>
                  <h3>{post.title}</h3>
                  <p>{post.date}</p>
                  <p>{post.content}</p>
                  <button>Read More</button>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
}