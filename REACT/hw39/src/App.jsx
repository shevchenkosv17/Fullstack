import React, { useState } from 'react';
import StatefulComponent from './components/StatefulComponent';
import StatelessComponent from './components/StatelessComponent';
import ClassComponent from './components/ClassComponent';

function App() {
  const [textState, setTextState] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Завдання 39</h1>
      <StatefulComponent onTextChange={setTextState} />
      <StatelessComponent text={textState} />
      <ClassComponent text={textState} />
    </div>
  );
}

export default App;
