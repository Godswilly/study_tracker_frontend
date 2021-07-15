import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../../actions/authActions';

const LogInWrap = styled.div`
  width: 50%;
  height: 540px;
  margin-left: 25%;
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #51adcf;


  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

const EmailWrap = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const PasswordWrap = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const FormWrap = styled.form`
  width: 100%;
  height: 300px;
`;

const EmailInp = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
  border: 0;

  &:focus {
    color: blue;
  }
`;

const PasswordInp = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
  border: 0;

  &:focus {
    color: blue;
  }
`;

const LoginBtn = styled.button`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #1f3c88;
  color: white;
  border: 0;

  &:hover {
    cursor: pointer;
  }
`;

const Login = ({ login, authenticated: { loggedIn } }) => {
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  const handleChange = (e) => setloginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <LogInWrap>
      <FormWrap onSubmit={handleSubmit}>
        <EmailWrap>
          <EmailInp
            type="email"
            onChange={handleChange}
            value={email}
            placeholder="Enter your email"
            name="email"
            required
          />
        </EmailWrap>
        <PasswordWrap>
          <PasswordInp
            type="password"
            onChange={handleChange}
            value={password}
            placeholder="Enter your password"
            name="password"
            required
          />
        </PasswordWrap>
        <ButtonWrap>
          <LoginBtn type="submit" onSubmit={handleSubmit}>Login</LoginBtn>
        </ButtonWrap>
      </FormWrap>
    </LogInWrap>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
