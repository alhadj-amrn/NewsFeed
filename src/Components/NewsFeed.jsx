import NewsArticle from "./NewsArticle";

function NewsFeed(props) {
  const { articles } = props;
  return (
    <div>
      {articles.map((article) => (
        <NewsArticle key={JSON.stringify(article)} {...article} />
      ))}
    </div>
  );
}

export default NewsFeed;
