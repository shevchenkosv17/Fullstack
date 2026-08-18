import React, { useState } from 'react';

function ControlledForm() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Контрольоване введення: ${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h3>2. Контрольований компонент</h3>
      <label>
        Введіть текст: 
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleChange} 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </label>
      <p>Поточний стан: <strong>{inputValue}</strong></p>
      <button type="submit" style={{ marginTop: '5px', padding: '5px 10px' }}>Надіслати</button>
    </form>
  );
}

export default ControlledForm;

