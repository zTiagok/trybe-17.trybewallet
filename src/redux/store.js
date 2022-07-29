import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import wallet from './reducers/wallet';
import user from './reducers/user';

const rootReducer = combineReducers({
  wallet,
  user,
});

const Store = createStore(
  rootReducer,
  composeWithDevTools(),
);

if (window.Cypress) {
  window.store = Store;
}

export default Store;
