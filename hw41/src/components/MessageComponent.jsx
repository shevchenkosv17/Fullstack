import React, { use } from 'react';

function MessageComponent({ messagePromise }) {
  const data = use(messagePromise);

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
      <h3>2. Створення компоненту (хук use)</h3>
      <p>Отримані дані: <strong>{data}</strong></p>
    </div>
  );
}

export default MessageComponent;
