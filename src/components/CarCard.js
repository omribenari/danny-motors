import React from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  cover: {
    width: 150,
    height: 150,
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
      <CardContent>
        <Typography component="h6" variant="h6">
          {`${car.Make} - ${car.Model}`}
        </Typography>
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