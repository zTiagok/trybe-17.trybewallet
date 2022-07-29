import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { userInfo as actionUserInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    stateEmail: '',
    statePassword: '',
  }

  loginHandler = (origin) => {
    const { dispatchUserInfo } = this.props;
    const { stateEmail, statePassword } = this.state;

    origin.preventDefault();
    dispatchUserInfo(stateEmail, statePassword);

    const { history } = this.props;

    history.push('/carteira');
  }

  inputHandler = ({ target }) => {
    if (target.type === 'email') {
      this.setState({ stateEmail: target.value });
    }
    if (target.type === 'password') {
      this.setState({ statePassword: target.value });
    }
  }

  loginParameters = () => {
    const { stateEmail, statePassword } = this.state;
    const passMaxLength = 6;

    return (stateEmail.includes('@')
    && stateEmail.includes('.com')
    && statePassword.length >= passMaxLength);
  }

  render() {
    const { stateEmail, statePassword } = this.state;
    let btnDisabled = true;

    if (this.loginParameters()) {
      btnDisabled = false;
    }

    return (
      <>
        <span id="login-message">Login</span>
        <form id="login-form">
          <input
            type="email"
            data-testid="email-input"
            id="login-email"
            placeholder="Email"
            value={ stateEmail }
            onChange={ this.inputHandler }
          />

          <input
            type="password"
            data-testid="password-input"
            id="login-password"
            placeholder="Senha"
            minLength={ 6 }
            value={ statePassword }
            onChange={ this.inputHandler }
          />

          <button
            type="submit"
            id="login-submit"
            form="login-form"
            onClick={ this.loginHandler }
            disabled={ btnDisabled }
          >
            Entrar
          </button>
        </form>
      </>

    );
  }
}

Login.propTypes = {
  history: propTypes.oneOfType([propTypes.object]).isRequired,
  dispatchUserInfo: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUserInfo: (email, password) => dispatch(actionUserInfo(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
