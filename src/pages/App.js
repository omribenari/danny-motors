import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Header from '../components/Header';
import withRoot from '../withRoot';
import NotFoundPage from './NotFoundPage';
import AboutPage from './AboutPage';
import HomePage from './HomePage';
import ServiceReqPage from './ServiceReqPage';
import TermsOfServicePage from './TermsOfServicePage';
import AccountSummary from './AccountSummary';
import withStyles from '@material-ui/core/styles/withStyles';
import LoginPage from "./LoginPage";
import {FireCon} from "../common/FireCon";

const styles = () => ({
  appRoot: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  appMain: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    const PrivateRoute = ({ component: Component, ...rest }) => {
      const user = FireCon.getCurrentUser();
      return (
        <Route
          {...rest}
          render={props =>
            user && !user.isAnonymous ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
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
        <div className={classes.appRoot}>
          <Header />
          <div className={classes.appMain}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/service-req" component={ServiceReqPage} />
              <Route path="/tos" component={TermsOfServicePage} />
              <Route path="/login" component={LoginPage} />
              <PrivateRoute path="/account-summary" component={AccountSummary} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default withRoot(withStyles(styles)(App));
