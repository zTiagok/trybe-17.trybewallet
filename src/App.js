import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Store from './redux/store';

function App() {
  return (
    <Provider store={ Store }>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    </Provider>
  );
}

export default App;
