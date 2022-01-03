import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { getBoardType } from './api/boardTypes';
import HomePageBoardChoiceComponent from './components/HomePageBoardChoiceComponent/HomePageBoardChoiceComponent';
import DefaultScrumBoardComponent from './components/DefaultScrumBoard/DefaultScrumBoardComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePageBoardChoiceComponent/>}/>

        <Route path="/utworz-tablice" />

        <Route path="/my-scrum" element={<DefaultScrumBoardComponent/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
