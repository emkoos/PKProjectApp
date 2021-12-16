import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { getBoardType } from './api/boardTypes';
import HomePageBoardChoiceComponent from './components/HomePageBoardChoiceComponent/HomePageBoardChoiceComponent';

function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePageBoardChoiceComponent/>}/>

        <Route path="/utworz-tablice" />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
