import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

class HomePage extends Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      openDrawer: false,
    });
  };

  handleClick = () => {
    this.setState({
      openDrawer: true,
    });
  };

  render() {
    const { open } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Welcome to my garage
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to='/service-req'
        >
          Book a Service
        </Button>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
