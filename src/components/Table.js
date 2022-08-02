import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { deleteItem as actionRemoveItem } from '../redux/actions';

class Table extends Component {
  handleButtons = (id, origin) => {
    origin.preventDefault();
    const { expenses, dispatchRemoveItem } = this.props;
    const expensesArray = expenses;

    if (origin.target.className === 'delete-button') {
      const newExpenses = expensesArray.filter((expense) => expense.id !== id);
      dispatchRemoveItem(newExpenses);
    }

    if (origin.target.className === 'edit-button') {
      console.log(id);
    }
  }

  createCells = () => {
    const { expenses } = this.props;

    return expenses.map((expense) => (
      <tr key={ expense.id } id={ `cell-${expense.id}` }>
        <td>
          { expense.description }
        </td>
        <td>
          { expense.tag }
        </td>
        <td>
          { expense.method }
        </td>
        <td>
          { Number(expense.value).toFixed(2) }
        </td>
        <td>
          { expense.exchangeRates[expense.currency].name }
        </td>
        <td>
          { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
        </td>
        <td>
          { parseFloat(Number(expense.value)
          * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2) }
        </td>
        <td>
          Real
        </td>
        <td>
          <button
            type="submit"
            onClick={ (button) => this.handleButtons(expense.id, button) }
            data-testid="edit-btn"
            className="edit-button"
          >
            Editar
          </button>
          <button
            type="submit"
            onClick={ (button) => this.handleButtons(expense.id, button) }
            data-testid="delete-btn"
            className="delete-button"
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
        </thead>
        <tbody>
          { expenses.length
            ? this.createCells()
            : null}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: propTypes.oneOfType([propTypes.array]).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveItem: (payload) => dispatch(actionRemoveItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
