import React from 'react';
import Suggestions from './components/Suggestions';
import TagsForm from './components/TagsForm';
import InputForm from './components/InputForm';
import Overall from './components/Overall';
import Home from './components/Home';
import Base from './components/Base'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import base from'./base.png'

const App = () => {
  return (
    
    <BrowserRouter>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
    <header style={{ position: 'absolute', top: 70,left:200, display:'flex',justifyContent:'space-between'}}>
      <a id='problemBase' style={{ display: 'flex', alignItems: 'center' }} href='Base'>
        <img src={base} alt="Base" width={39} />
        <span style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 400, lineHeight: '16px', textAlign: 'left', marginLeft: 10 }}>Problem Base</span>
      </a>
      <svg width="37" height="30" viewBox="0 0 37 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right:-1100}}>
        <path d="M2 2H35.2942" stroke="black" stroke-width="2.77451" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 14.9478H35.2942" stroke="black" stroke-width="2.77451" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 27.8955H35.2942" stroke="black" stroke-width="2.77451" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </header>
    <Routes>
      <Route index element={<Home />}/>
      <Route path='Tags' element={<TagsForm />}/>
      <Route path='Input' element={<InputForm />}/>
      <Route path='Suggestions' element={<Suggestions/>}/>
      <Route path='Overall' element={<Overall/>}/>
      <Route path='Base' element={<Base/>}/>
    </Routes>
    </BrowserRouter>

  );
};

export default App;