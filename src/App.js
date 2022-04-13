import './App.css';
import React, { useEffect, useState } from 'react'
import Board from './Board';
import Post from './Post';

function App() {
  return (
    <div className="App">
      <Board />
	  <Post />
    </div>
  );
}
export default App;