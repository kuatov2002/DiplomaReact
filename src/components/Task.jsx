import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoadingOverlay from './LoadingOverlay';
import './Task.css';

const Task = () => {
  const { id } = useParams();
  const [problemData, setProblemData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const data = useLocation();
  const percentage = data.state?.similarity || '';

  const handleCodeChange = (e) => {
    if (code.length==0) {
      setCode(e.target.value);
    }
    
  };

  const getLineNumbers = () => {
    const lines = code.split('\n');
    const lineCount = Math.max(lines.length, 1); // Ensure at least one line number is displayed
    return Array.from({ length: lineCount }, (_, index) => (
      <span key={index} style={{ color: '#999', paddingRight: '10px' }}>
        {index + 1}
      </span>
    ));
  };

  const TagsContainer = styled.div`
    display: flex;
    align-items: center;
  `;

  const Tag = styled.div`
    background-color: ${props => {
      if (props.difficulty === 'Medium') return '#EBCA56';
      if (props.difficulty === 'Hard') return '#CD5656';
      return '#58ae6b'; // Default color
    }};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    padding: 2px 10px;
    margin: 3px 5px;
  `;

  const TagText = styled.span`
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 13px;
    color: #ffffff;
  `;

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://algoanalysesdeploym-production-2364.up.railway.app/getProblem/${id}`);
        const problem = response.data[0];
        setProblemData(problem);

        // Only fetch code if it's not already set or if it's empty
        if (code.length === 0) {
          const coderesponse = await axios.post('https://algoanalysesdeploym-production-2364.up.railway.app/java', {
            input: problem.description
          });
          setCode(coderesponse.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblemData();
  }, [id, code]); // Depend on `id` and `code` to fetch problem data only if `code` is empty

  if (!problemData) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    difficulty,
    topic,
    keywords,
    dataNotInteract,
    countingRelated,
    fewKManyV,
    joinData,
    conditionProblem,
    output,
  } = problemData;

  const tags = {
    Topic: topic,
    Difficulty: difficulty,
    Keywords: keywords,
    DataNotInteract: dataNotInteract,
    CountingRelated: countingRelated,
    FewKManyV: fewKManyV,
    JoinData: joinData,
    ConditionProblem: conditionProblem,
    Output: output,
  };

  return (
    <div className="Task">
      <LoadingOverlay isLoading={isLoading} />
      <div className="Nocode">
        <div style={{ display: 'flex' }}>
          <h1>{title}</h1>
          <TagsContainer>
            <Tag difficulty={difficulty}>
              <TagText>{difficulty.trim()}</TagText>
            </Tag>
          </TagsContainer>
        </div>
        <p style={{ color: '#7C7C7C', fontSize: 14 }}>{description}</p>
        <p>
          Main Topic: 
          <a href={`https://en.wikipedia.org/wiki/${topic}`} style={{ color: '#4E689A', textDecoration: 'underline' }}>
            {topic}
          </a>
        </p>
        <TagsContainer>
          Tags:
          {keywords.split(',').map((keyword, index) => (
            <Tag key={index}>
              <TagText>{keyword.trim()}</TagText>
            </Tag>
          ))}
        </TagsContainer>
        {percentage.length > 0 && <p>{percentage}% Similarity</p>}
      </div>
      <div className="Code" style={{ backgroundColor: '#f0f0f0' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ padding: '10px', display: 'flex', flexDirection: 'column' }}>
            {getLineNumbers()}
          </div>
          <textarea
            readOnly
            value={code}
            onChange={handleCodeChange}
            rows={10}
            cols={50}
            style={{
              border: 'none',
              fontFamily: 'monospace',
              fontSize: '14px',
              padding: '10px',
              resize: 'none',
              lineHeight: '19.26px',
              width: '100%',
              backgroundColor: '#f0f0f0',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
