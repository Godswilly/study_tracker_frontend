import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleLoginStatus, handleLogout } from '../actions/index';
import logoutIcon from '../assets/images/logout.png';
import Footer from './Footer';

const Home = ({
  user, status, handleLoginStatus, handleLogout
}) => {
  useEffect(() => {
    handleLoginStatus(status);
  }, [handleLoginStatus])

  eturn (
    <div className="h-100">
      {
        status === 'NOT_LOGGED_IN'
          ? (
            <div className="d-flex flex-column justify-content-around align-items-center login-page">
              <div className="d-flex flex-column justify-content-center">
                <h1 className="text-white">Studytrack.it</h1>
              </div>
              <div className="container d-flex flex-column justify-content-center">
                <Link to="/login" className="btn custom-button">
                  Login
                </Link>
                <Link to="/signup" className="btn custom-button">
                  Signup
                </Link>
              </div>
            </div>
          )
          : (
            <div className="d-flex flex-column h-100">
              <div className="header-title">
                Home
              </div>
              <div className="user-name">
                {user.name}
              </div>
              <div className="user-email">
                {user.email}
              </div>
              <div className="logout-button d-flex align-items-center">
                <img className="logout-img" src={logoutIcon} alt="logout" />
                <button type="button" className="btn ml-3" onClick={handleLogout}>Logout</button>
              </div>
              <Footer />
            </div>
          )
      }
    </div>
  );
};

ome.propTypes = {
  status: PropTypes.string.isRequired,
  handleLoginStatus: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleLoginStatus: (status) => dispatch(handleLoginStatus(status)),
  handleLogout: () => dispatch(handleLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
