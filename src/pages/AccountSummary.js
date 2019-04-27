import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserCars from "../components/UserCars";

class AccountSummary extends Component {
  render() {
    return (
      <div>
        <UserCars />
        <UserServices/>
      </div>
    );
  }
}

AccountSummary.propTypes = {};

export default AccountSummary;