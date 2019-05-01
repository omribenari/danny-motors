import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  withStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { FireCon } from '../common/FireCon';

const imageUrl =
  'https://images.unsplash.com/photo-1485761954900-f9a29f318567?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

const styles = () => ({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  input: {
    display: 'none',
  },
});

const LoginPage = props => {
  const { classes } = props;
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = () => {
    setIsAuthenticating(true);

    FireCon.login()
      .catch(error => {
        alert('error in google authentication');
      })
      .then(() => {
        setIsAuthenticating(false);
      });
  };

  return !isAuthenticating && FireCon.isSiginIn() ? (
    <Redirect
      to={{
        pathname: '/account-summary',
        state: { from: props.location },
      }}
    />
  ) : (
    <div className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Please login using your google account to access your private data.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleLogin}>
            {isAuthenticating ? (
              <CircularProgress variant="indeterminate" />
            ) : (
              'Sign in with Google'
            )}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(LoginPage);
