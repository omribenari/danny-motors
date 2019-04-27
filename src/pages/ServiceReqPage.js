import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import {Paper, withStyles} from '@material-ui/core';
import ServiceForm from "../components/ServiceForm";

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: 30,
    margin: 30,
  }
});

class ServiceReqPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} >
        <Paper  className={classes.paper} elevation={1} >
          <Typography variant="h3" gutterBottom>
            Request a service
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Complete the form to be contacted and book a service appointment
          </Typography>
          <hr/>
          <ServiceForm/>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ServiceReqPage);
