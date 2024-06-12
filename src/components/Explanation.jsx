import React from 'react';

import { useLocation } from 'react-router-dom';

const Explanation = () => {
  const data = useLocation();
  const task = data.state?.task || '';
  return (
    
    <div>{task}</div>
  );
};

export default Explanation;
