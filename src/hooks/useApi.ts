// This folder is for custom React hooks.
// For example, a hook to fetch data, handle forms, etc.

// Example of a custom hook to fetch data:
/*
import { useState, useEffect } from 'react';

export function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}
*/ 