import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import localization from 'util/strings';

/**
 * Top navigation bar with app name and link to source code.
 */

function Nav({ usingDarkTheme, toggleDarkTheme }) {
  const toggleTheme = () => {
    toggleDarkTheme(!usingDarkTheme);
  };

  const openCode = () => {
    window.location.href = 'https://github.com/anthonyftwang/spacetagram';
  };

  return (
    <nav>
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              '&.MuiTypography-root': {
                fontFamily: 'Cookie',
                fontSize: '2rem',
              },
            }}
          >
            {localization.appName}
          </Typography>
          <IconButton
            type="button"
            size="large"
            color="inherit"
            aria-label={
              usingDarkTheme
                ? localization.ariaLabels.lightThemeButton
                : localization.ariaLabels.darkThemeButton
            }
            onClick={toggleTheme}
          >
            {usingDarkTheme ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton
            type="button"
            size="large"
            color="inherit"
            aria-label={localization.ariaLabels.sourceCodeButton}
            onClick={openCode}
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </nav>
  );
}

Nav.propTypes = {
  /** Describes which theme is currently active. */
  usingDarkTheme: PropTypes.bool.isRequired,
  /** Callback when theme toggle is clicked. */
  toggleDarkTheme: PropTypes.func.isRequired,
};

export default Nav;
