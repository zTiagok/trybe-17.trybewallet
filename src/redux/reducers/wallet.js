import { CURRENCIES_INFO } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_INFO:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
