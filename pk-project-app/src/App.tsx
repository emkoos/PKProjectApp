import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getBoardType } from './api/boardTypes';

function App() {

  useEffect(() => {
    getBoardType("21adbda8-c90d-49dd-9778-e9ab9ac86d46").then(response => {
      console.log(response)
    }).catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
