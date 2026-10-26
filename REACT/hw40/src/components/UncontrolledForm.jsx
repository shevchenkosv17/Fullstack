import React, { useRef } from 'react';

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Неконтрольоване введення: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h3>3. Неконтрольований компонент</h3>
      <label>
        Введіть текст: 
        <input 
          type="text" 
          ref={inputRef} 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </label>
      <br />
      <button type="submit" style={{ marginTop: '15px', padding: '5px 10px' }}>Надіслати</button>
    </form>
  );
}

export default UncontrolledForm;

