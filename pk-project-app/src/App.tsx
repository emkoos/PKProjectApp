import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HomePageBoardChoiceComponent from './components/HomePageBoardChoiceComponent/HomePageBoardChoiceComponent';
import DefaultScrumBoardComponent from './components/DefaultScrumBoard/DefaultScrumBoardComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddNewCardComponent from './components/AddNewCardComponent/AddNewCardComponent';
import AddNewColumnComponent from './components/AddNewColumnComponent/AddNewColumnComponent';

function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePageBoardChoiceComponent/>}/>

        <Route path="/utworz-tablice" />

        <Route path="/my-scrum" element={<DefaultScrumBoardComponent/>}/>

        <Route path="/add-new-column" element={<AddNewColumnComponent/>}/>

        <Route path="/add-new-card" element={<AddNewCardComponent/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
