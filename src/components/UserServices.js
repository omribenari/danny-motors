import React from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
  },
});

const UserServices = props => {
  const { classes, services } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        UserServices
      </Paper>
    </div>
  );
};

UserServices.propTypes = {

};

export default withStyles(styles)(UserServices);