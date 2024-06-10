import React, { useState } from 'react';
import './InputForm.css';
import { useNavigate } from 'react-router-dom';

const InputForm = () => {
  const getButtonClass = () => {
    const inputLength = input.length;
    if (inputLength > 0 && inputLength <= 800) {
      return {
        className: 'greenButton',
        disabled: false,
      };
    }
    return {
      className: 'grayButton',
      disabled: true,
    };
  }
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post('/api/classify', { input:input });
      // console.log(response.data);
      // navigate('/', { state: response.data });
      navigate('/Tags', { state: { input } });
      // You can pass the response data to the TagsForm component here
    } catch (error) {
      console.error(error);
    }
  };
  const { className, disabled } = getButtonClass();
  return (
    <div className="InputForm">
      <div className="slider">
        <div className="line"></div>
        <div className="ellipse">
          <div className="inner-circle"></div>
        </div>
        <div className="ellipse"></div>
        <div className="ellipse"></div>
        <div className="ellipse"></div>
      </div>
      <form onSubmit={handleSubmit} className='input'>
        <p className='input' id="description">Type your problems description here</p>
        <textarea
          id="inputTextArea"
          name="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <p className='input' id='length'>{input.length}/800</p>
        <button type="submit" className={`SetParam ${className}`} disabled={disabled}>Set Parameters</button>
      </form>
    </div>
  );
};

export default InputForm;