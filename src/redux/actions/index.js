import getCurrencies from '../../api/getCurrencies';

export const USER_INFO = 'USER_INFO';
export const CURRENCIES_INFO = 'CURRENCIES_INFO';
export const EXCHANGE_INFO = 'EXCHANGE_INFO';

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

export const getCurrenciesThunk = () => async (dispatch) => {
  const data = await getCurrencies();
  delete data.USDT;
  const dataArray = Object.keys(data);

  const payload = dataArray;

  dispatch(currenciesInfo(payload));
};

export const exchangeInfoThunk = (payload) => async (dispatch) => {
  const data = await getCurrencies();
  const info = payload;
  const exchangeArray = [];
  let exchangeRates = {};
  delete data.USDT;
  const dataArray = Object.values(data);

  dataArray.forEach((response) => {
    const { ask, code, name } = response;

    exchangeRates = {
      [code]: {
        code,
        ask,
        name,
      },
    };

    exchangeArray.push(exchangeRates);
  });
  info.exchangeRates = Object.entries(exchangeArray);

  console.log(info);

  dispatch(exchangeInfo(payload));
};
