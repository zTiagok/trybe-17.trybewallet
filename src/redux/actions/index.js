import getCurrencies from '../../api/getCurrencies';

export const USER_INFO = 'USER_INFO';
export const CURRENCIES_INFO = 'CURRENCIES_INFO';
export const EXCHANGE_INFO = 'EXCHANGE_INFO';
export const SAVE_TOTAL = 'SAVE_TOTAL';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const FORM_EDITOR = 'FORM_EDITOR';
export const EXCHANGE_INFO_EDIT = 'EXCHANGE_INFO_EDIT';

export const userInfo = (email, password) => ({
  type: USER_INFO,
  payload: {
    email,
    password,
  },
});

export const currenciesInfo = (currencies) => ({
  type: CURRENCIES_INFO,
  payload: {
    currencies,
  },
});

export const exchangeInfo = (info) => ({
  type: EXCHANGE_INFO,
  payload: {
    expenses: info,
  },
});

export const exchangeInfoEdit = (info) => ({
  type: EXCHANGE_INFO_EDIT,
  payload: {
    expenses: info,
  },
});

export const deleteItem = (payload) => ({
  type: REMOVE_ITEM,
  payload: {
    expenses: payload,
  },
});

export const formEditor = (payload) => ({
  type: FORM_EDITOR,
  payload: {
    editor: true,
    idToEdit: payload,
  },
});

export const saveTotal = (total) => ({
  type: SAVE_TOTAL,
  payload: {
    total,
  },
});

export const getCurrenciesThunk = () => async (dispatch) => {
  const data = await getCurrencies();
  delete data.USDT;
  const dataArray = Object.keys(data);

  const payload = dataArray;

  dispatch(currenciesInfo(payload));
};

export const exchangeInfoThunk = (payload) => async (dispatch) => {
  const exchangeRates = await getCurrencies();

  const newPayload = {
    ...payload,
    exchangeRates,
  };

  dispatch(exchangeInfo(newPayload));
};
