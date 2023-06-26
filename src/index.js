import React from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App.jsx';
import store from './store';

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <BrowserRouter basename="/chips-ahoy">
        <Switch>
          <Route exact component={App} path="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </HttpsRedirect>,
  document.getElementById('root')
);
