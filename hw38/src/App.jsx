import React, { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    alert(`Ваш запит: ${inputValue}`);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Input 
        placeholder="Введіть текст..." 
        onChange={handleInputChange} 
      />
      <Button 
        text="Показати" 
        onClick={handleButtonClick} 
      />
    </div>
  );
}

export default App;
