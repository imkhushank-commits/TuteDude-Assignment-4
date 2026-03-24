import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  // state to store API data
  const [data, setData] = useState(null);

  // state to track loading
  const [loading, setLoading] = useState(true);

  // state to store error
  const [error, setError] = useState(null);

  /*
    useCallback is used so that the function is not recreated
    again and again on every render.

    It will only change when 'url' changes.
  */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true); // start loading
      setError(null);   // clear previous errors

      const response = await fetch(url);

      // check if response is ok
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result); // store data
    } catch (err) {
      // if error happens, store message
      setError(err.message);
    } finally {
      setLoading(false); // stop loading in both cases
    }
  }, [url]); // dependency array: runs again if URL changes

  /*
    useEffect is used to call the API when component loads
    and whenever fetchData changes
  */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetch;