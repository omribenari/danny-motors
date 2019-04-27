import React from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";

const UserCars = props => {
  const { cars } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>

      </Paper>
    </div>
  );
};

UserCars.propTypes = {
  
};

export default UserCars;