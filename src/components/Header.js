import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core';
import MenuDrawer from './MenuDrawer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import fire from '../fire';
import * as firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";

const styles = () => ({
  appbarWrapper: {
    flexGrow: 1,
  },
  iconButton: {
    marginLeft: '-12px',
    marginRight: '20px',
  },
  headerTypo: {
    flex: 1,
  },
  avatar: {
    margin: 10,
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      anchorEl: null,
      user: null,
    };

    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        this.setState({ user });
      } else {
        // User is signed out.
        this.setState({ user: null });
      }
    }.bind(this));

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = open => () => {
    this.setState({
      openDrawer: open,
    });
  };

  handleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    fire
      .auth()
      .signInWithRedirect(provider)
      .catch(error => {
        alert('error in google authentication');
      });
  }

  handleLogout() {
    fire
      .auth()
      .signOut()
      .catch(function(error) {
        alert('error on logout');
      });
    this.handleClose();
  }

  renderUserActionMenu = () => {
    const { classes } = this.props;
    const { anchorEl, user } = this.state;
    const openUserMenu = Boolean(anchorEl);

    return user && !user.isAnonymous ? (
      <div>
        <Button
          aria-owns={openUserMenu ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          {user.photoURL ?
            <Avatar alt={user.displayName} src={user.photoURL} className={classes.avatar} />
            :<AccountCircle className={classes.avatar}/>}
          {user.displayName}
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openUserMenu}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    ) : (
      <Button color="inherit" align="right" onClick={this.handleLogin}>
        Login
      </Button>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MenuDrawer
          open={this.state.openDrawer}
          toggleDrawer={this.toggleDrawer}
        />
        <div className={classes.appbarWrapper}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.iconButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h5"
                color="inherit"
                className={classes.headerTypo}
              >
                Danny's Motors
              </Typography>

              {this.renderUserActionMenu()}
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Header);