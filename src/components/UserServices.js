import React from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 30,
    margin: 30,
  }
});

const UserServices = props => {
  const { classes, services } = props;

  return (
    <div className={classes.root}>
      <Paper elevation={1}  className={classes.paper}>
        UserServices
      </Paper>
      {services.length}
    </div>
  );
};

UserServices.propTypes = {
  classes: PropTypes.object.isRequired,
  services: PropTypes.array.isRequired,
};

export default withStyles(styles)(UserServices);