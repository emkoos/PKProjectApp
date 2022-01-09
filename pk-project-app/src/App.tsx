import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HomePageBoardChoiceComponent from './components/HomePageBoardChoiceComponent/HomePageBoardChoiceComponent';
import DefaultScrumBoardComponent from './components/DefaultScrumBoard/DefaultScrumBoardComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddNewCardComponent from './components/AddNewCardComponent/AddNewCardComponent';
import AddNewColumnComponent from './components/AddNewColumnComponent/AddNewColumnComponent';
import CreateScrumTableComponent from './components/CreateScrumTableComponent/CreateScrumTableComponent';
import CreateToDoTableComponent from './components/CreateToDoTableComponent/CreateToDoTableComponent';
import DefaultToDoBoardComponent from './components/DefaultToDoBoardComponent/DefaultToDoBoardComponent';
import DefaultKanbanBoardComponent from './components/DefaultKanbanBoardComponent/DefaultKanbanBoardComponent';
import CreateKanbanTableComponent from './components/CreateKanbanTableComponent/CreateKanbanTableComponent';

function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePageBoardChoiceComponent/>}/>

        <Route path="/new-scrum" element={<CreateScrumTableComponent/>}/>
        <Route path="/new-todo" element={<CreateToDoTableComponent/>}/>
        <Route path="/new-kanban" element={<CreateKanbanTableComponent/>}/>

        <Route path="/utworz-tablice" />

        <Route path="/table-21adbda8-c90d-49dd-9778-e9ab9ac86d46" element={<DefaultScrumBoardComponent/>}/>
        <Route path="/table-83615ffa-f6b8-4657-a9f5-40fc10921735" element={<DefaultToDoBoardComponent/>}/>
        <Route path="/table-f6afea8f-17ce-4a31-9227-ba426f7ba78b" element={<DefaultKanbanBoardComponent/>}/>

        {/* <Route path="/table-83615ffa-f6b8-4657-a9f5-40fc10921735" element={<DefaultToDoBoardComponent/>}/>
        <Route path="/table-f6afea8f-17ce-4a31-9227-ba426f7ba78b" element={<DefaultKanbanBoardComponent/>}/>
        <Route path="/table-985cc71e-09d1-472b-bc94-2a663b8c4efa" element={<DefaultOwnBoardComponent/>}/> */}

        <Route path="/add-new-column" element={<AddNewColumnComponent/>}/>

        <Route path="/add-new-card" element={<AddNewCardComponent/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
