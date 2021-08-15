import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import { signup, setMyError } from '../../actions/index';

const RegFormWrap = styled.div`
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

const NameWrap = styled.div`
  width: 60%;
  @media (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
  }
`;

const EmailWrap = styled.div`
  width: 60%;

  @media (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
  }
`;

const PasswordWrap = styled.div`
  width: 60%;

  @media (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
  }
`;

const ButtonWrap = styled.button`
  width: 78%;
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
    width: 116%;
    margin-left: 5%;
  }
`;

const FormWrap = styled.form`
  width: 50%;
  margin-left: 38%;
  height: 300px;

  @media(max-width: 768px) {
    width: 80%;
    margin-left: 0px;
  }
`;

const NameInp = styled.input`
  width: 130%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
  border: 0;

  &:focus {
    color: blue;
  }
`;

const EmailInp = styled.input`
  width: 130%;
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
  width: 130%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
  border: 0;

  &:focus {
    color: blue;
  }
`;

const CenterLink = styled.div`
  text-align: center;
  margin-right: 45%;

  @media(max-width: 768px) {
    margin-right: 0%;
  }
`;

const SignUp = ({ signup, setMyError, authenticated: { loggedIn, error } }) => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setMyError('');
  }, []);

  const { name, email, password } = signupData;

  const handleChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    signup(signupData);
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <RegFormWrap>
      <FormWrap>
        <NameWrap>
          <NameInp
            type="text"
            onChange={handleChange}
            placeholder="Name"
            value={name}
            name="name"
            required
          />
        </NameWrap>
        <EmailWrap>
          <EmailInp
            type="email"
            onChange={handleChange}
            placeholder="Email"
            value={email}
            name="email"
            required
          />
        </EmailWrap>
        <PasswordWrap>
          <PasswordInp
            type="password"
            onChange={handleChange}
            placeholder="Password"
            value={password}
            name="password"
            required
          />
        </PasswordWrap>
        <ButtonWrap type="submit" onClick={handleSubmit}>
          Create a new User
        </ButtonWrap>
        <CenterLink>
          or
          {' '}
          <Link to="/login">
            Login
          </Link>
        </CenterLink>
        { error === '' ? '' : Object.entries(error.error).map((entry) => (
          <h6 key={entry.id} className="text-danger">
            {entry[0]}
            {entry[1]}
          </h6>
        ))}
      </FormWrap>
    </RegFormWrap>
  );
};

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  setMyError: PropTypes.func.isRequired,
  authenticated: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth,
});

export default connect(mapStateToProps, { signup, setMyError })(SignUp);
