import goana from './goana.jpg'
import algo from './algo.jpg'
import './Home.css'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
// Тег
const Tag = styled.div`
width: 300px;
height:80px;
background-color: #2E683B;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 50px;
padding: 3px 10px;
margin: 40px 5px;
display: flex;
justify-content: center;
align-items: center;
`;

// Текст тега
const TagText = styled.span`
font-family: Inter;
font-size: 35px;
font-weight: 500;
line-height: 16px;
letter-spacing: -0.02em;
text-align: center;
color:white
`;
    return (
      <div  className='Home'>
        <div className="logo" >
        <img src={goana} alt="" />
        <img src={algo} alt="" />
        </div>
        <div className="text">
            <p style={{color:'#2E683B',textDecoration:'underline'}}>Analyze</p>
            <p> the problem in 3 steps. Practice on similar problems.</p>
        </div>
        <Tag onClick={() => navigate('/Input')}>
            <TagText>Lets Get Started</TagText>
          </Tag>
      </div>
    );
  };
  
  export default Home;