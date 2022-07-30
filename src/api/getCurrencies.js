const getCurrencies = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = response.json();

  return data;
};

export default getCurrencies;
