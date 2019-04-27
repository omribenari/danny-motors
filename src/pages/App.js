import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import withRoot from '../withRoot';
import NotFoundPage from './NotFoundPage';
import AboutPage from './AboutPage';
import HomePage from './HomePage';
import ServiceReqPage from "./ServiceReqPage";
import TermsOfServicePage from "./TermsOfServicePage";
import AccountSummary from "./AccountSummary";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/service-req" component={ServiceReqPage} />
          <Route path="/tos" component={TermsOfServicePage} />
          <Route path="/Account-summary" component={AccountSummary} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

export default withRoot(App);
