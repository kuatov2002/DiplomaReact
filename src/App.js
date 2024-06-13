import React, { useState } from 'react';
import Suggestions from './components/Suggestions';
import TagsForm from './components/TagsForm';
import InputForm from './components/InputForm';
import Overall from './components/Overall';
import Home from './components/Home';
import Base from './components/Base';
import Explanation from './components/Explanation';
import Task from './components/Task'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import base from './base.png';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <BrowserRouter>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
      <header style={{width:'80%', position: 'absolute', top: 70, left: '50%',transform:'translateX(-50%)', display: 'flex', justifyContent: 'space-between'}}>
        <a id='problemBase' style={{ display: 'flex', alignItems: 'center' }} href='/Base'>
          <img src={base} alt="Base" width={39} />
          <span style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 400, lineHeight: '16px', textAlign: 'left', marginLeft: 10 }}>Problem Base</span>
        </a>
        <IconButton
          aria-label="open drawer"
          onClick={toggleDrawer}
          style={{ position: 'absolute', right:0 }}
        >
          <MenuIcon fontSize="large" /> {/* Увеличенный размер иконки */}
        </IconButton>
      </header>
      <Routes>
        <Route index element={<Home />} />
        <Route path='Tags' element={<TagsForm />} />
        <Route path='Input' element={<InputForm />} />
        <Route path='Suggestions' element={<Suggestions />} />
        <Route path='Overall' element={<Overall />} />
        <Route path='Base' element={<Base />} />
        <Route path='Base/:id' element={<Task />} />
        <Route path='Explanation' element={<Explanation />} />
      </Routes>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <div style={{ height: '100%', width: 500, backgroundColor: '#2E683B', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ height: 160, width: 200, position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <a href='/' style={{ color: 'white', fontSize: 20, display: 'block', marginBottom: '10px' }}>Home</a>
            <a href='/' style={{ color: 'white', fontSize: 20, display: 'block', marginBottom: '10px' }}>Contacts</a>
            <a href='/' style={{ color: 'white', fontSize: 20, display: 'block', marginBottom: '10px' }}>GitHub Repo</a>
            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' style={{ color: 'white', fontSize: 20, display: 'block' }}>For Coffee</a>
          </div>
        </div>
      </Drawer>
    </BrowserRouter>
  );
};

export default App;