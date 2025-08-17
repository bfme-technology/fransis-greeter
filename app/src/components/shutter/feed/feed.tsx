import Skeleton from "react-loading-skeleton";
import CardWidget from "./cardwidget/cardwidget";
import useFeed from "./feed.hook";
import FeedContainer from "./feed.styles";

const Feed = () => {
  const { feed, loading } = useFeed();
  return (
    <FeedContainer>
      {loading ? <Skeleton count={1} /> : <h2>Feed</h2>}
      {loading ? <Skeleton count={1} /> : <p>Latest updates and news</p>}

      {loading && <Skeleton count={10} />}
      {!loading && !feed && <p>No feed data available</p>}
      {!loading && feed && feed.articles?.length > 0 && (
        <ul>
          {feed.articles.map((article) => (
            <CardWidget key={article.title} {...article} />
          ))}
        </ul>
      )}
    </FeedContainer>
  );
};

export default Feed;
