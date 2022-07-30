import getCurrencies from '../../api/getCurrencies';

export const USER_INFO = 'USER_INFO';
export const CURRENCIES_INFO = 'CURRENCIES_INFO';

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

export const getCurrenciesThunk = () => async (dispatch) => {
  const data = await getCurrencies();
  delete data.USDT;
  const dataArray = Object.keys(data);

  const payload = dataArray;

  dispatch(currenciesInfo(payload));
};
