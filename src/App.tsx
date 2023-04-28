import React, { useEffect } from 'react';
import './App.css'
import {Main} from './components/Main'
import { authAPI } from './components/api/api';

function App() {
  useEffect(() => {
      authAPI.verify()
  }, [])
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
