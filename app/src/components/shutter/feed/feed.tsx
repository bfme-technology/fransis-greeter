import Skeleton from "react-loading-skeleton";
import CardWidget from "./cardwidget/cardwidget";
import useFeed from "./feed.hook";
import FeedContainer from "./feed.styles";

const Feed = () => {
  const { feed, loading } = useFeed();
  return (
    <FeedContainer>
      <h2>{loading ? <Skeleton count={1} /> : <>Feed</>} </h2>
      <p>{loading ? <Skeleton count={1} /> : <>Latest updates and news</>}</p>
      <ul>
        {loading && <Skeleton count={10} />}
        {!loading && !feed && <>No feed data available</>}
        {!loading && feed && feed.articles?.length > 0 && (
          <>
            {feed.articles.map((article) => (
              <CardWidget key={article.title} {...article} />
            ))}
          </>
        )}
      </ul>
    </FeedContainer>
  );
};

export default Feed;
