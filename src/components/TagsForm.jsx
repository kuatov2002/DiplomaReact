import React, { useState, useEffect, useRef } from 'react';
import './TagsForm.css';
import './FilterDropdown.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/base/useSwitch';

import axios from 'axios';

import Popper from '@mui/material/Popper';
import LoadingOverlay from './LoadingOverlay';
const FilterDropdown = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopics, setExpandedTopics] = useState(false);

  const topics = [
    'Array',
    'String',
    'Hash Table',
    'Dynamic Programming',
    'Math',
    'Sorting',
    'Greedy',
    'Depth-First Search',
    'Database',
    'Binary Search',
    'Breadth-First Search',
    'Tree',
    'Matrix',
    // Add more topics here
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleExpandTopics = () => {
    setExpandedTopics(!expandedTopics);
  };

  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="filter-dropdown">
      <div className="search-container">
        <div className="search-icon">
          {/* Иконка поиска */}
        </div>
        <input
          type="text"
          placeholder="Filter topics"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="content">
        <div className="topics">
          <div className="tagss">
            {filteredTopics.slice(0, expandedTopics ? filteredTopics.length : 8).map((topic, index) => (
              <span key={index} className="tagss" onClick={() => {
                console.log(topic);
              }}>
                {topic}
              </span>
            ))}
          </div>
          {filteredTopics.length > 12 && (
            <div className="expand" onClick={toggleExpandTopics}>
              {expandedTopics ? 'Collapse' : 'Expand'}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const StyledPopper = styled(Popper)({
  '& .MuiAutocomplete-listbox': {
    maxHeight: '150px', // Установите желаемую высоту здесь
    overflowY: 'auto',
  },
});

const StyledAutocomplete = styled(Autocomplete)`
  & .MuiInputBase-input{
    text-overflow:clip;
  }
  & .MuiOutlinedInput-root {
    border-radius: 30px;
    height: 40px;
    padding: 0 10px;
    background: #2E683B;
    ${({ isEmpty }) => isEmpty && `
      background: white;
      & fieldset {
        border-width: medium;
        border-style: dashed;
        border-color: #2E683B;
      }
      & input {
        color:gray;
      }
    `}
  }
  & input {
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    height: 25px;
    padding-left: 5px;
  }
  & svg {
    color: white;
  }
`;

function BasicSwitch({ boolInt, ...props }) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    'Switch-checked': checked,
    'Switch-disabled': disabled,
    'Switch-focusVisible': focusVisible,
  };
  if (boolInt === 1) {
    stateClasses['Switch-checked'] = !checked;
  }
  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </BasicSwitchRoot>
  );
}

const StyledControl = styled(FormControl)`
  & .MuiInputBase-root {
    background: ${({ difficulty }) =>
    difficulty === 'Medium' ? '#EBCA56' : difficulty === 'Hard' ? '#CD5656' : '#2E683B'};
    border-radius: 30px;
    height: 40px;
    padding: 0 10px;
  }
  & .MuiSelect-select {
    color: white;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding-left: 5px;
  }
  & svg {
    color: white;
  }
`;

const blue = {
  200: '#B9DEC1',
  500: '#B9DEC1',
  700: '#B9DEC1',
};

const grey = {
  50: '#D9D9D9',
  100: '#D9D9D9',
  200: '#D9D9D9',
  300: '#D9D9D9',
  400: '#D9D9D9',
  500: '#D9D9D9',
  600: '#D9D9D9',
  700: '#D9D9D9',
  800: '#D9D9D9',
  900: '#D9D9D9',
};

const BasicSwitchRoot = styled('span')(
  ({ theme }) => `
  box-sizing: border-box;
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 38px;
  height: 24px;
  margin: 10px;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  border-radius: 24px;
  box-shadow: inset 0px 1px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.05)'
    };

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
  }
    
  &.Switch-focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${blue[500]};
    box-shadow: inset 0px 1px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'
    };
    &.Switch-focusVisible {
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  }
  `,
);

const BasicSwitchInput = styled('input')`
  box-sizing: border-box;
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const BasicSwitchThumb = styled('span')(
  ({ theme }) => `
  box-sizing: border-box;
  display: block;
  width: 16px;
  height: 16px;
  top: 3px;
  left: 2px;
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  position: relative;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  box-shadow: 0px 1px 2px
    ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.1)'};

  &.Switch-checked {
    left: 17px;
    background-color: #fff;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  }
`,
);
const topicWord = 'dynamic programming, linked list, string, array, math, hash table, backtracking, tree, breadth-first search, greedy, bit manipulation, design, stack, sort, divide and conquer, graph, binary search, union find, depth-first search, heap, line sweep, sliding window, two pointers, random, geometry, trie, ordered map, brainteaser, recursion, minimax, queue, binary search tree, segment tree, dequeue, classification, search, separate, optimization, colligate list, thread, twine, hash, coupled list, integer manipulation, recursive, drawstring, slew window technique, categorization algorithm, string up, parcel out compute systems, databases, machine acquire, machine get word, machine scholarship';
const list = topicWord.split(',');

const inputWord = 'array of integers and target, two variety tie-in lists, string, 2 arrays of elements, integer, string and pattern, string of text in English, nexus list, integer n, set of lists, array of integers nums and integer val, contact list, array of integers, dividend and divisor, train containing parentheses, matrix, two strings, array of elements and target element, positive integer, array of intervals, length and width, m x n matrix, move up sorting file and k integer, character matrix, string, inter-group communication list and target, two sorted arrays, and length of them, binary tree root node, tree root, three strings, two binary trees, two arrays of integers, string and word dictionary, link up list, head of a inter-group communication list, set of points in the multidimensional space, head of two linked lists, start word, an end word, and a list of words, num of courses and prerequisites, array of points, undirected graph, string and number of rows, log files, array of integers and number, cosmic string containing parentheses, string, array of words, subsets, graph with weights of edges, connexion list, and two integers, array of elements, array of strings, list of vertices, and the start vertex, list of item sizes and the size of each container, three numbers, liaison list, number k, sorted array of integers, matrix, target, two integers, head of the connect list, binary tree, tree root, target, multiple text files, training dataset bear feedback and their ratings, test dataset';
const inputList = inputWord.split(',');

const outputWord = "index of the integer number, 1 array with sum of elements from 2 arrays, length of the longest substring, median of the common array, boolean(s can personify break up into words from the wordDict dictionary?), string in zigzag order, sequence of binary numbers agree to the condition, draw defend the minimum window in string along that curb all characters from second string, boolean(is x palindrome?), string of text in pirate language, the maximum amount of water a container can stock, string(roman), length of the longest common subsequence, longest growth subsequence, sum pf the three integers, array of integers, with one at the end, 2 elements from array that equal to objective, list after erase a node, true if parentheses live balanced, false otherwise, sort out linked list arrest all nodes from two lists, list of all correct parentheses sequences of length n, combining list, length of the new array without elements with value val, list after alternate groups of nodes, integer, index of the element, array of arrays, unique combinations, smallest positive integer that make up not in the array, boolean(is string match pattern), minimum number of jumps, list of all possible permutations of nums, boolean(if target in matrix), boolean(if the word beryllium find in the matrix), boolean, two-dimensional array of size n go n, satiate with numbers from 1 to n^2 in the spiral order, array of non-intersecting intervals, unique paths, path from top left to nates right, the k-th element of array, matrix, array of combinations, maximal area of the rectangle, which can exist establish in the histogram, maximal area of the rectangle consisting of 1, connexion list after divide, boolean(if s3 can follow find by rearrange the characters in s1 and s2), one sorting array, list of all possible valid IP addresses, root node of the binary tree, number of structurally unique BST, list of lists of node values match to each level of the tree, boolean(if the trees Be equal), list of integers map the right visible side of the binary tree, maximum depth of the tree, proportionality or not, minimum depth of the tree, boolean(whether there equal a path with the ease up sum), tree with correctly inhabit next pointers, two-dimensional array correspond Pascal's triangle up to numRows, subsets of nums without repetitions, index of the first occurrence, length of the new array without duplicates, exist Palindrome?(boolean), the closest pair of points and the convex hull of the set of points, head of a contact list, sort in go up order, k clusters, each of which hold points, indices of substring, maximum sum of a continuous subsequence of array elements, node exemplify the first intersection of two linked lists, the missing number, number of rooms, maximum subsequence sum of elements, shortest path from the initial word to the final one, array of strings, number of Islands in matrix, boolean(if the tree exist a binary search tree), three numbers in sorted order, least number of perfect square, number of palindromic substrings, subset of vertices hold back the minimum number of vertices, assort reviews into positive, negative, or neutral infrastructure on a machine-learning model, array where the i-th position follow the number of ones in the binary representation of number i, aggregative log information incur as a result of data march, number of ways to decode string, longest palindrome substring, number of non-empty subarrays, array of integers, boolean(if the game live wager correctly), boolean(if s2 can exist get from s1), boolean(if the tree constitute symmetric), head of the contact list after bump off duplicates, sorted array of elements, prediction for test dataset, minimum number of subsets want to masking all elements., sorted array of integers, list of words and number of their mentions in the text, change colligate list, where m-th node turn n-th node, and (m+1)-th node get (n-1)-th node, and so on, list of node values in in-order traversal order, shortest paths, number of containers necessitate to throng all items., list after barter nodes, breadth first traversal (from first vertex), list of lines stop matches with the pattern in each file";
const outputList = outputWord.split(',');

const CrossIcon = ({ onClick = (event) => event.currentTarget.parentNode.remove() }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TagsForm = () => {
  const formRef = useRef(null);
    const location = useLocation();
    const task = location.state?.input || '';
    const navigate = useNavigate();
    useEffect(() => {
      const sendRequest = async () => {
        try {
          const response = await axios.post('https://algoanalysesdeploym-production-2364.up.railway.app/classify', {
            input: task
          });
          const responseData = response.data;
          console.log(responseData);
          setTopic(responseData.topic);
          setDifficulty(responseData.difficulty);
          setInput(responseData.input);
          setOutput(responseData.output);
          setTags(responseData.keywords);
          setDataInter(responseData.binary[0]);
          setCount(responseData.binary[1]);
          setFew(responseData.binary[2]);
          setJoin(responseData.binary[3]);
          setRelate(responseData.binary[4]);
        } catch (error) {
          console.error(error);
        }
      };
      sendRequest();
    }, [task]); // Add task to the dependency array



  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const diffArray = ['Easy', 'Medium', 'Hard'];
  const diffIndex = diffArray.indexOf(difficulty);
  const [inputName, setInput] = useState('');
  const [outputName, setOutput] = useState('');
  const [DataInter, setDataInter] = useState('');
  const [Count, setCount] = useState('');
  const [Few, setFew] = useState('');
  const [Join, setJoin] = useState('');
  const [Relate, setRelate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]); // Инициализируем состояние с начальным массивом тегов
  // ... другой код

  const handleDataInterChange = (value) => {
    setDataInter(value ? '1' : '0');
  };

  const handleCountChange = (value) => {
    setCount(value ? '1' : '0');
  };

  const handleFewChange = (value) => {
    setFew(value ? '1' : '0');
  };

  const handleJoinChange = (value) => {
    setJoin(value ? '1' : '0');
  };

  const handleRelateChange = (value) => {
    setRelate(value ? '1' : '0');
  };

  const handleAddTag = (some) => {
    // Добавляем новый тег в массив
    setTags([...tags, some]);
  };

  const handleTagChange = (index, newValue) => {
    // Обновляем значение тега по индексу
    const newTags = [...tags];
    newTags[index] = newValue;
    setTags(newTags);
  };

  const handleRemoveTag = (index) => {
    // Удаляем тег из массива по индексу
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleSubmit = async (e) => {
    console.log('Loading...');
    e.preventDefault();
    setIsLoading(true);
    const input = {
      Topic: topic,
      Keywords: tags.join(', '), // Преобразуем массив тегов в строку
      Input: inputName,
      Output: outputName,
      Difficulty: difficulty,
      DataNotInteract: DataInter, // Передаем строковые значения
      CountingRelated: Count,
      FewKManyV: Few,
      JoinData: Join,
      ConditionProblem: Relate
    };
    const sendRequest = async () => {
      try {
        const response = await axios.post('https://algoanalysesdeploym-production-2364.up.railway.app/find_similar_problems', {
          input: input
        });
        const responseData = response.data;
        console.log(response.data);
        console.log(input);
        navigate('/Suggestions', { state: { responseData, input,task } });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    sendRequest();
    
  };


  return (
    
    <div className='TagsForm'>
      <LoadingOverlay isLoading={isLoading} />
      <div class="slider">
        <div class="line"></div>
        <div class="ellipse">
        
        </div>
        <div class="ellipse">
        <div class="inner-circle"></div>
        </div>
        <div class="ellipse"></div>
        <div class="ellipse"></div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className='Tags'>
        <div id="left">
          <div id="category">
            <p>Main Topic</p>
            <FilterDropdown />
            <StyledAutocomplete
              className="autocomplete"
              disablePortal
              options={list}
              sx={{ width: 250, margin: 'auto 0' }}
              PopperComponent={StyledPopper}
              renderInput={(params) => <TextField {...params} />}
              value={topic}
              onChange={(event, newValue) => setTopic(newValue || '')}
              isEmpty={!topic}
              name='topic'
            />
          </div>

          <div id="input">
            <p>Input</p>
            <StyledAutocomplete
              className="autocomplete"
              disablePortal
              options={inputList}
              sx={{ width: '100%', margin: 'auto 0' }}
              renderInput={(params) => <TextField {...params} />}
              value={inputName}
              onChange={(event, newValue) => setInput(newValue || '')}
              isEmpty={!inputName}
              name='input' 
            />
          </div>
          <div id="output">
            <p>Output</p>
            <StyledAutocomplete
              className="autocomplete"
              disablePortal
              options={outputList}
              sx={{ width: '100%', margin: 'auto 0' }}
              renderInput={(params) => <TextField {...params} />}
              value={outputName}
              onChange={(event, newValue) => setOutput(newValue || '')}
              isEmpty={!outputName}
              name='output'
            />
          </div>

          <div id="difficulty">
            <p>Difficulty</p>
            <StyledControl
              sx={{ width: 130, margin: 'auto 0' }}
              difficulty={difficulty} // Передаем difficulty как проп
            >
              <Select value={diffIndex} onChange={(e) => setDifficulty(diffArray[e.target.value])} name='difficulty'>
                <MenuItem value={0}>Easy</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>Hard</MenuItem>
              </Select>
            </StyledControl>
          </div>
          <p>Tags</p>
          <p id="addon">Add one or more tags for better results.</p>
          <div id="tags">
            <Fab aria-label="add" size="small" style={{ margin: '0 6px 0 0' }}>
              <AddIcon style={{ color: 'white' }} onClick={() => handleAddTag('some')} />
            </Fab>
            {tags.map((tag, index) => (
              <Fab key={index} variant="extended" size="medium" color="primary">
                <p onChange={(e) => handleTagChange(index, e.target.value)}>{tag}</p>
                <CrossIcon onClick={() => handleRemoveTag(index)} />
              </Fab>
            ))}

          </div>
        </div>
        <div id="right">
          <h1>MapReduce Classification</h1>
          <div className="feature">
            <p>Data not interact</p> <BasicSwitch boolInt={DataInter} onChange={handleDataInterChange}/>
          </div>
          <div className="feature">
            <p>Counting Related</p> <BasicSwitch boolInt={Count} onChange={handleCountChange}/>
          </div>
          <div className="feature">
            <p>Few keys many values</p> <BasicSwitch boolInt={Few} onChange={handleFewChange}/>
          </div>
          <div className="feature">
            <p>Joining Data</p> <BasicSwitch boolInt={Join} onChange={handleJoinChange}/>
          </div>
          <div className="feature">
            <p>Related to the condition</p> <BasicSwitch boolInt={Relate} onChange={handleRelateChange}/>
          </div>
        </div>
        
      </form>
      <div className="buttons">
      <button type="button" className='Back' onClick={() =>navigate('/Input')}>{'<'}- Back</button>
      <button type="button" onClick={() => formRef.current.requestSubmit()} className='Go'>Go -{'>'}</button>
      </div>
      
    </div>
  );
};

export default TagsForm;
