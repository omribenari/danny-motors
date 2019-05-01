import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { MoreVert, EventNote } from '@material-ui/icons';
import Typography from "@material-ui/core/Typography";

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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  fGrow: {
    flexGrow: 1,
    marginLeft: 5,
  },
});

const ServiceCard = props => {
  const { classes, service } = props;
//          {`${car.Make} - ${car.Model}`}
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <EventNote/>
          <Typography component="h6" variant="h6" className={classes.fGrow}>
            {service.serviceType}
          </Typography>
          <IconButton aria-label="Add to favorites">
            <MoreVert />
          </IconButton>
        </div>
        <Typography variant="subtitle1" color="textSecondary">
          {`Car: ${service.car.Make} - ${service.car.Model}`}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {new Date(service.serviceTime).toString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

ServiceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceCard);
