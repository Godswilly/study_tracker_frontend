import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { logout } from '../actions/index';
import Footer from './Footer';

const MainWrap = styled.div`
  width: 100%;
  height: 480px;
  background-color: #51adcf;

  @media (max-width: 768px) {
    height: 480px;
  }

`;

const UserWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  height: 390px;
  @media (max-width: 768px) {
    height: 450px;
  }

`;

const HeaderStyle = styled.div`
  text-align: center;
`;

const Bg = styled.div`
  background-color: #51adcf;
`;

const WelcomeMsg = styled.div`
  font-size: 26px;
  color: white;
`;

const Name = styled.div`
  font-size: 29px;
  color: gray;
`;

const LogoutPos = styled.div`
  position: absolute;
  right: 10%;

  @media(max-width: 768px) {
    top: 10%;
  }
`;

const LogoutBtn = styled.button`
  background-color: red;
  color: white;
  border: none;
`;

const Home = ({ auth: { user }, logout }) => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };
  useEffect(() => {
    if (!(localStorage.token)) {
      history.push('/login');
    }
  }, []);

  return (
    <Bg>
      <>
        <MainWrap>
          <UserWrap>
            <HeaderStyle>
              <WelcomeMsg>Welcome to Study-Tracker App</WelcomeMsg>
              <Name>{user.name}</Name>
              {' '}
              !!
            </HeaderStyle>
            <LogoutPos>
              <LogoutBtn type="button" onClick={handleLogout}>Logout</LogoutBtn>
            </LogoutPos>
          </UserWrap>
        </MainWrap>
        <Footer />
      </>
    </Bg>
  );
};

Home.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,

});

export default connect(mapStateToProps, { logout })(Home);
