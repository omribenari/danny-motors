import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { MoreVert } from '@material-ui/icons';

const styles = () => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  fGrow: {
    flexGrow: 1,
  },
});

const ServiceCard = props => {
  const { classes, service } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
      </CardContent>
    </Card>
  );
};

ServiceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceCard);
