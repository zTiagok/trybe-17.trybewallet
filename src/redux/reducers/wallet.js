import { CURRENCIES_INFO, EXCHANGE_INFO, SAVE_TOTAL } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_INFO:
    return {
      ...state,
      currencies: action.payload.currencies,
    };

  case EXCHANGE_INFO:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };

  case SAVE_TOTAL:
    return {
      ...state,
      total: action.payload.total,
    };

  default:
    return state;
  }
};

export default wallet;
