import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Face, Home, EventAvailable, School } from '@material-ui/icons';
import { withStyles } from '@material-ui/core';

const menuItems = [
  {
    icon: <Home />,
    text: 'Home',
    url: '/',
  },
  {
    icon: <EventAvailable />,
    text: 'Service request',
    url: '/service-req',
  },
  {
    icon: <School />,
    text: 'Terms of service',
    url: '/tos',
  },
  {
    icon: <Face />,
    text: 'About',
    url: '/about',
  },
];

const styles = () => ({
  sideListWrapper: {},
});

const MenuDrawer = props => {
  const { classes, toggleDrawer, open } = props;

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <div tabIndex={0} role="button">
        <div className={classes.sideListWrapper}>
          <List>
            {menuItems.map(item => (
              <ListItem
                key={item.text}
                button
                component={Link}
                to={item.url}
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </Drawer>
  );
};

MenuDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuDrawer);
