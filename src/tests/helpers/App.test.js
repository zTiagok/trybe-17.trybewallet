import React from 'react';
import App from '../../App';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootReducer } from '../../redux/store';
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';

describe('Testing the LOGIN component', () => {
  it('Should have a LOGIN text in the index page', () => {
    const customHistory = createMemoryHistory();
    const Store = createStore(rootReducer);

    render(
      <Router history={ customHistory }>
        <Provider store={ Store }>
          <App />
        </Provider>
      </Router>
    )

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  })

  it('Should have a EMAIL/PASSWORD text in the index page', () => {
    const customHistory = createMemoryHistory();
    const Store = createStore(rootReducer);

    render(
      <Router history={ customHistory }>
        <Provider store={ Store }>
          <App />
        </Provider>
      </Router>
    )
  

    const loginPlaceholder = screen.getByTestId('email-input')
    const passPlaceholder = screen.getByTestId('password-input')
    const submitButton = screen.getByTestId('submit-button')

    expect(loginPlaceholder).toBeInTheDocument();
    expect(passPlaceholder).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(loginPlaceholder).toHaveTextContent('');
    expect(passPlaceholder).toHaveTextContent('');

    expect(submitButton).toBeDisabled();

    userEvent.click(loginPlaceholder);
    userEvent.type(loginPlaceholder, 'alguem@gmail.com');

    userEvent.click(passPlaceholder);
    userEvent.type(passPlaceholder, '123456');

    expect(submitButton).not.toBeDisabled();

    userEvent.click(submitButton);
  })
})

describe('Testing the HEADER component', () => {
  it('Should have a LOGIN text in the index page', () => {
    const Store = createStore(rootReducer);

    render(
      <MemoryRouter initialEntries={["/carteira"]}>
        <Provider store={ Store }>
          <App />
        </Provider>
      </MemoryRouter>
    )

    const teste = screen.getByText('Descridasdasdção');

    expect(teste).toBeInTheDocument();
  })
})