import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import Home from '../containers/Home';
import Login from './auth/Login';
import NewStudy from './NewStudy';
import EditStudy from './EditStudy';
import Study from './Study';
import Progress from '../containers/Progress';
import Header from '../containers/Header';
import Signup from './auth/Signup';
import setAuthToken from '../helpers/setAuthToken';
import loadUser from '../actions/authActions';
import store from '../store';
import AllStudy from './allStudyData';
import '../assets/index.css';

const AppWrap = styled.div`
  width: 100%;
  height: 570px;
`;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AppWrap>
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/studies" exact component={NewStudy} />
            <Route path="studies/:id" exact component={Study} />
            <Route path="/allStudies" exact component={AllStudy} />
            <Route path="/edit/:id" exact component={EditStudy} />
            <Route path="/levels/progress" exact component={Progress} />
          </Switch>
        </Router>
      </AppWrap>
    </Provider>
  );
};

export default App;
