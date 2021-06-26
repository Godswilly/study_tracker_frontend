import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Login from './auth/Login';
import Studies from '../containers/Studies';
import Study from './Study';
import NewStudy from './NewStudy';
import EditStudy from './EditStudy';
import Progress from '../containers/Progress';
import Registration from './auth/Registration';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Registration} />
        <Route path="/login" exact component={Login} />
        <Route path="/studies" exact component={Studies} />
        <Route path="/study/:id" exact component={Study} />
        <Route path="/study" exact component={NewStudy} />
        <Route path="/edit/:id" exact component={EditStudy} />
        <Route path="/progress" exact component={Progress} />
      </Switch>
    </Router>
  );
}

export default App;
