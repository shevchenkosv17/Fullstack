import React, { Suspense } from 'react';
import MessageComponent from './components/MessageComponent';

const fetchMessage = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Привіт з асинхронного сервера через хук use()!');
    }, 2000);
  });
};

const messagePromise = fetchMessage();

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1>Домашнє завдання 41: React 19 use()</h1>
      
      <Suspense fallback={<p style={{ color: 'gray' }}>Завантаження повідомлення (затримка 2 сек)...</p>}>
        <MessageComponent messagePromise={messagePromise} />
      </Suspense>
    </div>
  );
}

export default App;
