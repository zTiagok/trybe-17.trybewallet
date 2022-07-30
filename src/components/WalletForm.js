import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { getCurrenciesThunk as actionGetCurrenciesThunk } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatchGetCurrencies } = this.props;
    dispatchGetCurrencies();
  }

  render() {
    const { currencies } = this.props;

    console.log(currencies);

    return (
      <div id="page-wallet-form">
        <form id="wallet-form">

          <label htmlFor="wallet-form-currency">
            Moeda:
            <select data-testid="currency-input" id="wallet-form-currency">
              { currencies.map((currency) => (
                <option key={ currency } value={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="wallet-form-value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              placeholder="100,00"
              id="wallet-form-value"
            />
          </label>

          <label htmlFor="wallet-form-description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              placeholder="Utilizado para..."
              id="wallet-form-description"
            />
          </label>

          <label htmlFor="wallet-form-method">
            Método de Pagamento:

            <select id="wallet-form-method" data-testid="method-input">
              <option type="submit" value="Dinheiro">Dinheiro</option>
              <option type="submit" value="Cartão de crédito">Cartão de Crédito</option>
              <option type="submit" value="Cartão de débito">Cartão de Débito</option>
            </select>
          </label>

          <label htmlFor="wallet-form-tag">
            Categoria:
            <select id="wallet-form-tag" data-testid="tag-input">
              <option value="alimentação">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saúde">Saúde</option>
            </select>
          </label>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatchGetCurrencies: propTypes.func.isRequired,
  currencies: propTypes.oneOfType([propTypes.array]).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetCurrencies: () => dispatch(actionGetCurrenciesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
