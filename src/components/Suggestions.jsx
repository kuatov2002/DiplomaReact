import React from 'react';
import styled from 'styled-components';
import './Suggestions.css'
import { useLocation,useNavigate } from 'react-router-dom';

const ProblemCardContainer = styled.div`
  display:flex;
  flex-direction:column;
  background-color: #f0f0f0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  padding: 20px;
  margin-right: 20px;
  margin-left: 20px;
  width: 100%;
  max-width: 800px; // Устанавливаем максимальную ширину для адаптивности
`;

// Заголовок проблемы
const ProblemTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
`;

// Описание проблемы
const ProblemDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #7c7c7c;
`;

// Контейнер для категории и тегов
const CategoryAndTags = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

// Категория
const Category = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #000000;
  margin-right: 10px;
`;

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
  padding: 3px 10px;
  margin: 3px 5px;
`;

// Текст тега
const TagText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #ffffff;
`;

// Контейнер для уровня сложности и кнопки
const SimilarityAndButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

// Уровень сходства (сложности)
const Similarity = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 25px;
  color: #000000;
`;

// Кнопка "Show solution"
const Button = styled.button`
  background-color: #2e683b;
  border-radius: 35px;
  padding: 6px 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  width:200px;
  height:60px;
  margin:auto 0px;
`;

// Тег сложности
const DifficultyTag = styled.div`
  background-color: ${props =>
    props.difficulty === 'Easy'
      ? '#58ae6b'
      : props.difficulty === 'Medium'
        ? '#ebca56'
        : '#cd5656'};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 35px;
  padding: 2px 10px;
  height:20px;
  margin: auto 10px;
  margin-top:3px;
`;

// Текст сложности
const DifficultyText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  text-transform: capitalize; // Делаем первую букву заглавной
`;  

// Компонент карточки проблемы
const ProblemCard = ({ difficulty, title, description, category, tags, similarity,taskid }) => {
  const navigate = useNavigate(); // Перемещение внутри компонента
  return (
    <ProblemCardContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ProblemTitle>{title}</ProblemTitle>
        <DifficultyTag difficulty={difficulty}>
          <DifficultyText>{difficulty}</DifficultyText>
        </DifficultyTag>
      </div>

      <ProblemDescription>{description}</ProblemDescription>
      <CategoryAndTags>
        <Category>Category: {category}</Category>

      </CategoryAndTags>
      <TagsContainer>
        Tags:
        {tags.map((tag, index) => (
          <Tag key={index}>
            <TagText>{tag}</TagText>
          </Tag>
        ))}
      </TagsContainer>
      <SimilarityAndButton>
        <Similarity>{`${similarity}% similarity`}</Similarity>
        <Button  onClick={() =>navigate('/Base/'+taskid, { state: { similarity } })}>Show solution &rarr;</Button>
      </SimilarityAndButton>
    </ProblemCardContainer>
  );
};

// Компонент приложения
const Suggestions = () => {
  const navigate = useNavigate();
  const data = useLocation();
  const tasks = data.state?.responseData || '';
  const tags = data.state?.input || '';
  const task = data.state?.task|| '';
  console.log(tasks);
  console.log(tags);
  console.log(task);

  return (
    <div style={{ margin: '300px 200px' }} className='Suggestions'>
      <div class="slider">
        <div class="line"></div>
        <div class="ellipse">

        </div>
        <div class="ellipse">

        </div>
        <div class="ellipse">
          <div class="inner-circle"></div>
        </div>
        <div class="ellipse"></div>
      </div>
      <div style={{ display: 'flex', marginBottom: 56 }}>
        {tasks.map((problem, index) => {
          let description = problem.description.substring(0, 250);
          if (problem.description.length > 250) {
            description += ' . . .';
          }
          return (
            <ProblemCard
              key={index}
              difficulty={problem.similarityScore}
              title={problem.title}
              description={description}
              category={problem.difficulty}
              tags={problem.topic.replaceAll(' ','').split(',')}
              similarity={problem.keywords}
              taskid={problem.problemId}
            />
          );
        })}

      </div>
      <div className="buttons">
        <button type="button" className='Back' onClick={() => navigate('/Tags')}>{'<'}- Back</button>
        <button type="button" className='Go' onClick={() => navigate('/Overall', { state: { tasks,tags,task } })}>Go -{'>'}</button>
      </div>

    </div>
  );
};

export default Suggestions;

