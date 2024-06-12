import React from 'react';
import './Overall.css';
import styled from 'styled-components';
import { useLocation,useNavigate } from 'react-router-dom';
// Контейнер для тегов
const TagsContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Тег
const Tag = styled.div`
  background-color: #58ae6b;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 2px 10px;
  margin: 3px 5px;
`;

// Текст тега
const TagText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #ffffff;
`;

const Overall = () => {
  const navigate = useNavigate();
  const data = useLocation();
  const tasks = data.state?.tasks || '';
  const responseData=tasks;
  const tags = data.state?.tags || '';
  const input=tags;
  const task = data.state?.task || '';
  console.log(tasks);
  console.log(tags);
  console.log(task);

  return (
    <div className='overall'>
      <div class="slider">
        <div class="line"></div>
        <div class="ellipse">

        </div>
        <div class="ellipse">

        </div>
        <div class="ellipse">

        </div>
        <div class="ellipse"><div class="inner-circle"></div></div>
      </div>
      <div className="problem">
        <h2>Your Problem:</h2>
        <textarea name="" id="" readOnly style={{width: 400,height: 325,padding: 10}}>{task}</textarea>
      </div>
      <div className="parameters">
        <h2>Parameters:</h2>
        <div className="topic">
          <p>Main Topic</p>
          <textarea readOnly className='Card'>{tags.Topic}</textarea>
        </div>
        <div className="input">
          <p>Input</p>
          <textarea readOnly className='Card'>{tags.Input}</textarea>
        </div>
        <div className="output">
          <p>Output</p>
          <textarea readOnly className='Card'>{tags.Output}</textarea>
        </div>
        <div className="difficulty">
          <p>Difficulty</p>
          <textarea readOnly className='Card'>{tags.Difficulty}</textarea>
        </div>
        <div className="tags">
          <h2>Tags</h2>
          {tags.Keywords && tags.Keywords.split(',').length > 0 && (
  <TagsContainer>
    {tags.Keywords.split(',').map((keyword, index) => (
      <Tag key={index}>
        <TagText>{keyword}</TagText>
      </Tag>
    ))}
  </TagsContainer>
)}

        </div>
      </div>
      <div className="others">
        <div className="analyses">
          <h2>MapReduce Analyses</h2>
          <div className="analyses">
            {Object.entries(tags).map(([key, value]) => {
              if (value === '1'||value===1) {
                return (
                  <p key={key}><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.345 15.895C12.4015 15.895 15.69 12.5606 15.69 8.44752C15.69 4.33437 12.4015 1 8.345 1C4.28847 1 1 4.33437 1 8.44752C1 12.5606 4.28847 15.895 8.345 15.895Z" stroke="black" strokeWidth="1.84" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.1416 6.21328C6.1416 3.60663 10.1814 3.60665 10.1814 6.21328C10.1814 8.07516 8.3451 7.70271 8.3451 9.93697" stroke="black" strokeWidth="1.84" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.34497 12.9236L8.35256 12.9153" stroke="black" strokeWidth="1.84" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>{key}</p>
                );
              } else {
                return null; // Пропускаем вывод
              }
            })}
          <button type="button" className='Back' style={{width:200,height:35,fontSize:16}} onClick={() => navigate('/Explanation', { state: { task} })}>Show Explanation</button>
          </div>
        </div>
        <div className="top3">
          <h2>Top 3 Similar Problems</h2>
          <ul style={{width:200}}>
            {tasks.map((task)=>(
              <li>{task.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="buttons">
        <button type="button" className='Back' onClick={() => navigate('/Suggestions', { state: { responseData, input,task } })}>{'<'}- Back</button>
        <button type="button" className='Go' onClick={() => navigate('/Input', { state: { tasks,tags,task } })}>New Problem</button>
      </div>
    </div>
  );
};

export default Overall;