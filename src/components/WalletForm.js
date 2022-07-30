import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { getCurrenciesThunk as actionGetCurrenciesThunk,
  exchangeInfoThunk as actionExchangeInfoThunk } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  }

  componentDidMount() {
    const { dispatchGetCurrencies } = this.props;
    dispatchGetCurrencies();
  }

  saveInfoButton = (origin) => {
    origin.preventDefault();
    this.setState((prevState) => ({ id: prevState.id + 1 }));

    const { id, value, currency, method, tag, description } = this.state;
    const { dispatchSaveInfo } = this.props;

    const payload = {
      id,
      value,
      currency,
      method,
      tag,
      description,
    };

    dispatchSaveInfo(payload);
  }

  handleChanges = ({ target }) => {
    switch (target.id) {
    case 'wallet-form-currency':
      this.setState({ currency: target.value });
      break;

    case 'wallet-form-value':
      this.setState({ value: Number(target.value) });
      break;

    case 'wallet-form-description':
      this.setState({ description: target.value });
      break;

    case 'wallet-form-tag':
      this.setState({ tag: target.value });
      break;

    case 'wallet-form-method':
      this.setState({ method: target.value });
      break;

    default:
      return null;
    }
  }

  render() {
    const { currencies } = this.props;

    return (
      <div id="page-wallet-form">
        <form id="wallet-form">

          <label htmlFor="wallet-form-currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="wallet-form-currency"
              onChange={ this.handleChanges }
            >

              { currencies.map((currency) => (
                <option
                  key={ currency }
                  value={ currency }
                  className="currencyType"
                >
                  {currency}
                </option>
              ))}

            </select>
          </label>

          <label htmlFor="wallet-form-value">
            Valor:
            <input
              required
              data-testid="value-input"
              type="number"
              placeholder="100,00"
              id="wallet-form-value"
              onChange={ this.handleChanges }
            />
          </label>

          <label htmlFor="wallet-form-description">
            Descrição:
            <input
              required
              data-testid="description-input"
              type="text"
              placeholder="Utilizado para..."
              id="wallet-form-description"
              onChange={ this.handleChanges }
            />
          </label>

          <label htmlFor="wallet-form-tag">
            Categoria:
            <select
              id="wallet-form-tag"
              data-testid="tag-input"
              onChange={ this.handleChanges }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="wallet-form-method">
            Método de Pagamento:
            <select
              id="wallet-form-method"
              data-testid="method-input"
              onChange={ this.handleChanges }
            >
              <option type="submit" value="Dinheiro">Dinheiro</option>
              <option type="submit" value="Cartão de crédito">Cartão de Crédito</option>
              <option type="submit" value="Cartão de débito">Cartão de Débito</option>
            </select>
          </label>

          <button
            type="submit"
            form="wallet-form"
            onClick={ this.saveInfoButton }
          >
            Adicionar Despesa
          </button>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatchGetCurrencies: propTypes.func.isRequired,
  dispatchSaveInfo: propTypes.func.isRequired,
  currencies: propTypes.oneOfType([propTypes.array]).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetCurrencies: () => dispatch(actionGetCurrenciesThunk()),
  dispatchSaveInfo: (exchangeInfo) => dispatch(actionExchangeInfoThunk(exchangeInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
