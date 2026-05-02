import { useState, useEffect, useCallback } from 'react';

const API_BASE = '';

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    fetch(API_BASE + url)
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading: loading, refetch };
}