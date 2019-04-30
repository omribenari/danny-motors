import React from 'react';
import { Card, CardContent, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import fire from '../fire';
import { Redirect } from 'react-router-dom';

const imageUrl =
  'https://images.unsplash.com/photo-1485761954900-f9a29f318567?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

const styles = theme => ({
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

  const user = fire.auth().currentUser;

  return user && !user.isAnonymous ? (
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
      </Card>
    </div>
  );
};

export default withStyles(styles)(LoginPage);
