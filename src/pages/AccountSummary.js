import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserCars from '../components/UserCars';
import UserServices from '../components/UserServices';
import withStyles from '@material-ui/core/styles/withStyles';
import fire, { collections } from '../fire';

const styles = () => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  cardsRow: {
    display: 'flex',
    flexFlow: 'row wrap',
    flex: 1,
  },
  card: {
    flexGrow: 1,
  },
});

class AccountSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingUserInfo: false,
      userInfo: undefined,
      cars: [],
      services: [],
    };
  }

  componentWillMount() {
    fire
      .firestore()
      .collection(collections.USERS_INFO)
      .doc(fire.auth().currentUser.uid)
      .onSnapshot(doc => {
        const data = doc.data();
        this.setState({
          userInfo: data,
          cars: data.Cars,
          services: data.Services,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { cars, services } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.cardsRow}>
          <UserCars className={classes.card} cars={cars} />
          <UserServices className={classes.card} services={services} cars={cars} />
        </div>
      </div>
    );
  }
}

AccountSummary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountSummary);
