import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://typicode.com')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Помилка завантаження даних');
        }
        return response.json();
      })
      .then((todos) => {
        setData(todos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Завантаження даних...</p>;
  if (error) return <p style={{ color: 'red' }}>Помилка: {error}</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h3>4. Запит до сервера</h3>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetcher;
