import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import localization from 'util/strings';

/**
 * Top navigation bar with app name and link to source code.
 */

function Nav() {
  const openCode = () => {
    window.location.href = 'https://github.com/anthonyftwang/spacetagram';
  };

  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {localization.appName}
          </Typography>
          <IconButton
            type="button"
            size="large"
            color="inherit"
            onClick={openCode}
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </nav>
  );
}

export default Nav;
