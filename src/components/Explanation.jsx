import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import pic from './Goanaguru.png';
const StyledPre = styled.pre`
  padding: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  white-space: pre-wrap;
  word-wrap: break-word;
  width:60%;
  margin-left:150px;
  background: #58AE6B;
  color:white;
`;

const Explanation = () => {
  const data = useLocation();
  const Guru = data.state?.Guru || '';

  return (
    <div style={{display:'flex'}}>
      <StyledPre>{Guru}</StyledPre>
      <img src={pic} alt="" width={500} height={500} style={{position:'fixed',bottom:0,right:0}}/>
    </div>

  );
};

export default Explanation;