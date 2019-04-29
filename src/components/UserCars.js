import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Add as AddIcon } from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCarDialog from './AddCarDialog';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    margin: 30,
  },
  content: {
    padding: 30,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
});

const UserCars = props => {
  const { classes, cars } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Paper elevation={1} className={classes.paper}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Cars
            </Typography>
            <Tooltip title="Add car">
              <IconButton aria-label="Add car" onClick={() => setOpen(true)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          {cars.length}
        </div>
      </Paper>
      <AddCarDialog open={open} handleClose={() => setOpen(false)}/>
    </Fragment>
  );
};

UserCars.propTypes = {
  classes: PropTypes.object.isRequired,
  cars: PropTypes.array.isRequired,
};

export default withStyles(styles)(UserCars);
