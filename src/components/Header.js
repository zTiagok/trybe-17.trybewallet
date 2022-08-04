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
  }

  render() {
    const { email, expenses } = this.props;

    return (
      <header>
        <div>
          <div id="header-user">
            <p data-testid="email-field" id="header-username">
              { !email
                ? 'Sua Conta'
                : email }
            </p>
            <div id="header-icon" />
          </div>
          <div id="header-coin">
            <p data-testid="total-field" id="header-expenses">
              R$
              { expenses.length
                ? this.headerSum()
                : (0).toFixed(2) }
            </p>
            <p data-testid="header-currency-field" id="header-currency"> BRL </p>
          </div>
        </div>
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
