import React, { useState } from 'react';

import './input.css';

interface InputProps {
  onSearchStringChange: (str: string) => void;
}

const Input: React.FC<InputProps> = ({ onSearchStringChange }) => {
  const [value, setValue] = useState('');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
    onSearchStringChange(e.target.value);
  };

  return (
    <div className='input-container'>
      <input
        type='text'
        placeholder='Поиск'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
