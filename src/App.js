import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Nav from 'components/Nav';
import PhotoList from 'views/PhotoList';
import { muiLightTheme, muiDarkTheme } from 'util/themes';
import './App.css';

function App() {
  const [darkThemeActive, setDarkThemeActive] = useState(true);

  return (
    <ThemeProvider theme={darkThemeActive ? muiDarkTheme : muiLightTheme}>
      <CssBaseline />
      <div className="App">
        <Nav
          usingDarkTheme={darkThemeActive}
          toggleDarkTheme={setDarkThemeActive}
        />
        <main>
          <PhotoList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
