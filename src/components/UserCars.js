import React from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
  },
});

const UserCars = props => {
  const { classes, cars } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        UserCars
      </Paper>
    </div>
  );
};

UserCars.propTypes = {
  
};

export default withStyles(styles)(UserCars);