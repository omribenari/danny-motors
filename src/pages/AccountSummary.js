import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserCars from "../components/UserCars";
import UserServices from "../components/UserServices";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
});

class AccountSummary extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <UserCars />
        <UserServices/>
      </div>
    );
  }
}

AccountSummary.propTypes = {};

export default withStyles(styles)(AccountSummary);