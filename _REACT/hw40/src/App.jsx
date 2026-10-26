import React from 'react';
import ControlledForm from './components/ControlledForm';
import UncontrolledForm from './components/UncontrolledForm';
import DataFetcher from './components/DataFetcher';

function App() {
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1>Домашнє завдання: React компоненти та API</h1>
      
      <ControlledForm />
      
      <UncontrolledForm />
      
      <DataFetcher />
    </div>
  );
}

export default App;
