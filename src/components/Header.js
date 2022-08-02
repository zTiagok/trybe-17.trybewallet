import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  headerSum = () => {
    const { expenses } = this.props;

    const totalSum = expenses.reduce((prev, current) => prev
    + (parseFloat(Number(current.value))
    * (parseFloat(Number(current.exchangeRates[(current.currency)].ask)))), 0).toFixed(2);

    return totalSum;
    // const { expenses } = this.props;
    // const number = 10;
    // const { currency, exchangeRates } = expenses[expenses.length - 1];
    // const selectedCurrency = exchangeRates.filter((exchange) => exchange[currency]);
    // const selectedCurrency2 = (selectedCurrency[0]);
    // const { ask } = selectedCurrency2[currency];
    // return totalSum;
  }

  render() {
    const { email, expenses } = this.props;

    return (
      <header>
        <p data-testid="email-field" id="header-user">
          { !email
            ? 'Sua Conta'
            : email }
        </p>
        <p data-testid="total-field" id="header-expenses">
          { expenses.length
            ? this.headerSum()
            : 0 }
        </p>
        <p data-testid="header-currency-field" id="header-currency"> BRL </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.oneOfType([propTypes.array]).isRequired,

};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
