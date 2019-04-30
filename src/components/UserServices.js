import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Add as AddIcon } from '@material-ui/icons';
import AddServiceDialog from './AddServiceDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ServiceCard from "./ServiceCard";

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

const UserServices = props => {
  const { classes, services, cars } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Paper elevation={1} className={classes.paper}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Services
            </Typography>
            <Tooltip title="Add new service request">
              <IconButton
                aria-label="Service request"
                onClick={() => setOpen(true)}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <List className={classes.content}>
          {services.map(service => (
            <ListItem alignItems="flex-start" key={service.LicensePlate}>
              <ServiceCard service={service} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <AddServiceDialog
        open={open}
        handleClose={() => setOpen(false)}
        cars={cars}
      />
    </Fragment>
  );
};

UserServices.propTypes = {
  classes: PropTypes.object.isRequired,
  services: PropTypes.array.isRequired,
  cars: PropTypes.array.isRequired,
};

export default withStyles(styles)(UserServices);
