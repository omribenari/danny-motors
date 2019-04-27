import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Header from '../components/Header';
import withRoot from '../withRoot';
import NotFoundPage from './NotFoundPage';
import AboutPage from './AboutPage';
import HomePage from './HomePage';
import ServiceReqPage from './ServiceReqPage';
import TermsOfServicePage from './TermsOfServicePage';
import AccountSummary from './AccountSummary';
import fire from "../fire";

class App extends Component {

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => {
      const user = fire.auth().currentUser;
      return (
        <Route
          {...rest}
          render={props =>
            user && !user.isAnonymous ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      );
    };
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/service-req" component={ServiceReqPage} />
          <Route path="/tos" component={TermsOfServicePage} />
          <PrivateRoute path="/account-summary" component={AccountSummary} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default withRoot(App);
