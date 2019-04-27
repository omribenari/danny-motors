import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { ErrorOutlined, Home } from '@material-ui/icons';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
    margin: 20,
  },
  icon: {
    fontSize: 38,
    marginRight: '10px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NotFoundPage = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.content}>
            <ErrorOutlined className={classes.icon} />
            <Typography variant="h4">Page not found</Typography>
          </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/"
          >
            <Home />
            Go home
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(NotFoundPage);
