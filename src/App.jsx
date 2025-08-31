import { Container, CircularProgress, Typography, Button } from "@mui/material";
import NewsFeed from "./Components/NewsFeed";
import NewsHeader from "./Components/NewsHeader";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";
import LoadingArticle from "./Components/LoadingArticle.";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",

  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageNumber = useRef(1);
  const queryValue = useRef("");

  async function loadData() {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${
          queryValue.current || "news"
        }&page=${pageNumber.current}&pageSize=4&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await response.json();
      if (!data.articles || data.articles.length === 0) {
        throw new Error("No articles found");
      }
      return data.articles.map((article) => {
        const { title, description, author, publishedAt, urlToImage, url } =
          article;
        return {
          title,
          description,
          author,
          publishedAt,
          image: urlToImage,
          url,
        };
      });
    } catch (err) {
      setError(err.message);
      return [];
    }
  }

  const fetchAndUpdateArticles = () => {
    setLoading(true); // Start loading
    loadData().then((data) => {
      setArticles(data);
      setLoading(false); // Stop loading
    });
  };

  const debounceLoadData = debounce(fetchAndUpdateArticles, 1000);

  useEffect(() => {
    console.log("revaluated");
    fetchAndUpdateArticles();
  }, []);

  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debounceLoadData();
  };
  const handleNextClick = () => {
    pageNumber.current = pageNumber.current + 1;
    fetchAndUpdateArticles();
  };
  const handlePreviousClick = () => {
    pageNumber.current = pageNumber.current - 1;
    fetchAndUpdateArticles();
  };
  return (
    <Container>
      <NewsHeader onSearchChange={handleSearchChange} />
      {loading ? (
        <>
          <div>
            {[...Array(4)].map((_, index) => (
              <LoadingArticle key={index} />
            ))}
          </div>
        </>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <NewsFeed articles={articles} />
      )}
      <Footer>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={pageNumber.current === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={articles.length < 2 || loading === true}
        >
          Next
        </Button>
      </Footer>
    </Container>
  );
}

export default App;
