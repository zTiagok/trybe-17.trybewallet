import { CURRENCIES_INFO, EXCHANGE_INFO, FORM_EDITOR,
  REMOVE_ITEM, EXCHANGE_INFO_EDIT } from '../actions';

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

  case EXCHANGE_INFO_EDIT:
    return {
      ...state,
      expenses: action.payload.expenses,
      editor: false,
    };

  case REMOVE_ITEM:
    return {
      ...state,
      expenses: action.payload.expenses,
    };

  case FORM_EDITOR:
    return {
      ...state,
      editor: action.payload.editor,
      idToEdit: action.payload.idToEdit,
    };

  default:
    return state;
  }
};

export default wallet;
