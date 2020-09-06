import { useState, useEffect } from 'react';

function useGetData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error();
        }
      } catch (error) {
        setError(true);
        return [];
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return [data, loading, error];
}

export default useGetData;
