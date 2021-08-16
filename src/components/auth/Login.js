import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { login, setMyError } from '../../actions/index';

const LogInWrap = styled.div`
  width: 100%;
  height: 560px;
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
  width: 60%;
  margin-left: 50%;

  @media (max-width: 768px) {
    margin-left: 30%;
    width: 100%;
  }
`;

const PasswordWrap = styled.div`
  width: 60%;
  margin-left: 50%;

  @media (max-width: 768px) {
    margin-left: 30%;
    width: 100%;
  }
`;

const ButtonWrap = styled.div`
  width: 60%;
  margin-left: 50%;

  @media (max-width: 768px) {
    margin-left: 0%;
    width: 100%;
  }
`;

const FormWrap = styled.form`
  width: 60%;
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

const SignupWrap = styled.div`
  margin-left: 45%;
  margin-top: 2%;
  position: absolute;
  top: 300px;
  @media(max-width: 768px) {
    margin-left: 32%;
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
  @media(max-width: 768px) {
    margin-left: 30%;
    }
`;

const Login = ({ login, setMyError, authenticated: { loggedIn, error } }) => {
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setMyError('');
  }, []);

  const { email, password } = loginData;

  const handleChange = (e) => setloginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(loginData);
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <LogInWrap>
      <FormWrap>
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
          <LoginBtn type="submit" onClick={handleSubmit}>Login</LoginBtn>
        </ButtonWrap>
        { error === '' ? '' : <h6 className="text-danger">{error.error.user_authentication}</h6>}
      </FormWrap>
      <SignupWrap>
        <Link to="/signup">
          Signup
        </Link>
      </SignupWrap>
    </LogInWrap>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setMyError: PropTypes.func.isRequired,
  authenticated: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth,
});

export default connect(mapStateToProps, { login, setMyError })(Login);
