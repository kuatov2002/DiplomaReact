import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledPre = styled.pre`
  padding: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-weight:bold;
  width:60%;
  margin-left:150px;
`;

const Explanation = () => {
  const data = useLocation();
  const Guru = data.state?.Guru || '';

  return (
    <div>
      <StyledPre>{Guru}</StyledPre>
    </div>
  );
};

export default Explanation;