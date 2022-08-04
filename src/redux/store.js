import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import wallet from './reducers/wallet';
import user from './reducers/user';

export const rootReducer = combineReducers({
  wallet,
  user,
});

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

if (window.Cypress) {
  window.store = Store;
}

export default Store;
