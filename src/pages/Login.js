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
      <div id="login-page-content">
        <div id="login-page">
          <h3 id="login-message">Acesse sua Conta</h3>
          <hr />
          <form id="login-form" autoComplete="off">
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
              data-testid="submit-button"
              onClick={ this.loginHandler }
              disabled={ btnDisabled }
            >
              Entrar
            </button>
          </form>

          <nav>
            <a href="oi"> Criar conta. </a>
            <a href="oi"> Não consigo acessar minha conta. </a>
          </nav>

          <div id="login-footer">
            <p id="login-footer-dev"> Desenvolvido por Tiago Braga Costa </p>
            <p id="login-footer-date"> 04 de Agosto de 2022 </p>
            <p id="login-footer-version"> v0.0.1 </p>
          </div>
        </div>
        <div id="login-page-image" />
      </div>
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
