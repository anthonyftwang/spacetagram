import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Nav from 'components/Nav';
import PhotoList from 'views/PhotoList';
import { muiLightTheme, muiDarkTheme } from 'util/themes';
import useStateWithLocalStorage from 'hooks/useStateWithLocalStorage';
import './App.css';

function App() {
  const [lightThemeActive, setLightThemeActive] = useStateWithLocalStorage(
    'spacetagram_use_light_theme'
  );

  return (
    <ThemeProvider theme={lightThemeActive ? muiLightTheme : muiDarkTheme}>
      <CssBaseline />
      <div className="App">
        <Nav
          usingLightTheme={lightThemeActive}
          toggleLightTheme={setLightThemeActive}
        />
        <main>
          <PhotoList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
