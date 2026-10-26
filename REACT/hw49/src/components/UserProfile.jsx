import { useState, useEffect } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://typicode.com')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Помилка при завантаженні даних');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div data-testid="loading">Завантаження...</div>;
  }

  if (error) {
    return <div data-testid="error">Помилка: {error}</div>;
  }

  return (
    <div className="user-profile">
      <h1>Профіль користувача</h1>
      <p><strong>Ім'я:</strong> {user?.name}</p>
      <p><strong>Електронна пошта:</strong> {user?.email}</p>
    </div>
  );
}
