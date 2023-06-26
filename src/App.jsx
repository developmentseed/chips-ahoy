import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Home from './pages/Home.jsx';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: red
  }
});

const App = () => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const token_url = searchParams.get('token');

  // read token param
  if (token_url) {
    // delete token from url
    searchParams.delete('token');
    history.replace({ search: searchParams.toString() });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home token_url={token_url} />
    </ThemeProvider>
  );
};

export default App;
