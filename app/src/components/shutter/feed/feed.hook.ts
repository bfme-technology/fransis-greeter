import { useCallback, useEffect, useState } from "react";
import { NewsResponse } from "./feed.types";

const useFeed = () => {
  // Custom hook logic for feed
  const [feed, setFeed] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const url =
    "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";

  const fetchFeed = useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }, [url]);

  useEffect(() => {
    const getFeed = async () => {
      const data = await fetchFeed();
      if (!data || !data.articles) {
        console.error("Failed to fetch feed data");
        setLoading(false);
        return;
      }
      setInterval(() => {
        setLoading(false);
        setFeed(data);
      }, 2000);
    };
    getFeed();
  }, [fetchFeed]);

  return {
    feed,
    loading,
  };
};

export default useFeed;
