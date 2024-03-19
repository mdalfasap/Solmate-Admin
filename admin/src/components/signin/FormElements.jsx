// FormElements.js

import React ,{useState} from 'react';
import { motion } from 'framer-motion';

const rubber = () => {
  return {
    transform: [
      'scale3d(1,1,1)',
      'scale3d(1.4,.55,1)',
      'scale3d(.75,1.25,1)',
      'scale3d(1.25,.85,1)',
      'scale3d(.9,1.05,1)',
      'scale3d(1,1,1)',
    ],
  };
};

const FormElements = ({ motionText, buttonText, additionalText, linkText, urlLogin, urlRegister ,handleSubmit}) => {
  const [formValues, setFormValues] = useState({});
  const mText = additionalText.split('');
  const handleInputChange = (label, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [label]: value }));
  };

  return (
    <>
    <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(45deg, #3498db, #2ecc71);
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
  
          .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
  
          label {
            display: block;
            margin-bottom: 10px;
            font-size: 16px;
            color: #333;
          }
  
          input {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            margin-bottom: 10px;
            color: black;
            outline: none;
            border: 1px solid;
          }
  
          button {
            background-color: #2ecc71;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 0;
          }
  
          button:hover {
            background-color: #27ae60;
          }
  
          input:focus {
            background-color: transparent;
            color: black;
            outline: #27ae60 solid;
          }
  
          .reg {
            outline: none;
            background-color: transparent;
            border: none;
          }
        `}
      </style>
      <form className="container" onSubmit={(e) => handleSubmit(e, formValues)}>
        {motionText.map((label, index) => (
          <div key={index} className="input-group">
            <motion.label
              whileHover={{ scale: 1.1, color: '#2ecc71' }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.label>
            <motion.input
              type={label.toLowerCase().includes('password') ? 'password' : 'text'}
              whileHover={{scale: 1.05,borderColor: '#2ecc71',boxShadow: '0 0 10px rgba(46, 204, 113, 0.4)' }}
              transition={{duration: 0.3 }}
              onChange={(e) => handleInputChange(label, e.target.value)}
            />
          </div>
        ))}
        <motion.button className='mb-2'
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {buttonText}
        </motion.button>
        <br />
        <div className={urlLogin ? 'ps-5' : 'ps-3'} style={{ display: 'flex', whiteSpace: 'pre-wrap' }}>
          {mText.map((text, index) => (
            <motion.label whileHover={rubber()} key={index}>
              {text}
            </motion.label>
          ))}<span>&nbsp;</span>
          <a className='reg' href={urlLogin || urlRegister} style={{ textDecoration: 'none' }}>{linkText}</a>
        </div>
      </form>
    </>
  );
};

export default FormElements;
