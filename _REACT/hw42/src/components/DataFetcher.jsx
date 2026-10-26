import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
        setError(null);
      } catch (err) {
        setError('Сталася помилка при завантаженні даних. Будь ласка, спробуйте пізніше.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', fontSize: '18px' }}>Завантаження даних...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red', fontWeight: 'bold' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Список постів від сервера:</h2>
      <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
        {data.map((post) => {
          const { id, title, body } = post;
          return (
            <li key={id} style={{ marginBottom: '15px' }}>
              <strong style={{ textTransform: 'capitalize' }}>{title}</strong>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DataFetcher;
