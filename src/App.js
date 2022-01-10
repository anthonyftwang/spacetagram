import React from 'react';
import Nav from 'components/Nav';
import PhotoList from 'views/PhotoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <main>
        <PhotoList />
      </main>
    </div>
  );
}

export default App;
