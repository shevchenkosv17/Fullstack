import React, { useState } from 'react';

const StatefulComponent = ({ onTextChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onTextChange(newValue);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Введіть текст сюди..."
      />
    </div>
  );
};

export default StatefulComponent;
