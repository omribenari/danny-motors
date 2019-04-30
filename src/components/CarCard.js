import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { MoreVert } from '@material-ui/icons';

const styles = () => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  cover: {
    width: 180,
    height: 180,
    objectFit: 'cover',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  fGrow: {
    flexGrow: 1,
  },
});

const CarCard = props => {
  const { classes, car } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        component="img"
        src={car.imgUrl}
        title={`${car.Make} - ${car.Model}`}
      />
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <Typography component="h6" variant="h6" className={classes.fGrow}>
            {`${car.Make} - ${car.Model}`}
          </Typography>
          <IconButton aria-label="Add to favorites">
            <MoreVert />
          </IconButton>
        </div>
        <Typography variant="subtitle1" color="textSecondary">
          {`Year: ${car.Year}`}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {`License plate: ${car.LicensePlate}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

CarCard.propTypes = {
  classes: PropTypes.object.isRequired,
  car: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarCard);
