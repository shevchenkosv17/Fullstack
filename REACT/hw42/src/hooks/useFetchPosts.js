import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchPosts = (limit = 7) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://typicode.com{limit}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError('Сталася помилка при завантаженні даних. Будь ласка, спробуйте пізніше.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  return { data, loading, error };
};
