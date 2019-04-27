import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import HelpIcon from './HelpIcon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import fire from '../fire';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
});

class ServiceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      isComplete: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      carMake: '',
      carModel: '',
      carYear: '',
      carKm: '',
      carVin: '',
      notes: '',
      checkedTos: false,
      isAnonymous: undefined,
      uid: undefined,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
  }

  clearForm() {}

  getFormDataFromState() {
    return {
      client: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
      },
      car: {
        Make: this.state.carMake,
        Model: this.state.carModel,
        Year: this.state.carYear,
        Km: this.state.carKm,
        VIN: this.state.carVin,
      },
      notes: this.state.notes,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault(); // <- prevent form submit from reloading the page


    this.setState({
      isSubmitting: true,
    });

    const user = fire.auth().currentUser;
    if(!user) {
      fire
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          alert('error connecting to server');
        });
    }

    const data = this.getFormDataFromState();
    /* Send the form to Firebase */
    fire
      .database()
      .ref('guestServiceReq')
      .push(data)
      .then(this.handleSubmitSuccess)
      .catch(this.handleSubmitFailed);
  };

  handleSubmitSuccess() {
    this.clearForm();
    this.setState({
      isComplete: true,
    });
  }

  handleSubmitFailed(data) {
    alert(data.message);
    this.setState({
      isSubmitting: false,
    });
  }

  render() {
    const { classes } = this.props;
    const { isSubmitting, isComplete } = this.state;

    if (isComplete) {
      return <div>done</div>;
    }
    return (
      <form
        noValidate
        autoComplete="off"
        className={classes.container}
        onSubmit={this.handleSubmit}
      >
        <Typography variant={'subtitle2'}>Contact information</Typography>
        <div className={classes.formRow}>
          <TextField
            required
            id="first-name"
            label="First name"
            className={classes.textField}
            onChange={this.handleChange('firstName')}
            value={this.state.firstName}
            margin="normal"
          />
          <TextField
            required
            id="last-name"
            label="Last name"
            className={classes.textField}
            onChange={this.handleChange('lastName')}
            value={this.state.lastName}
            margin="normal"
          />
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            className={classes.textField}
            onChange={this.handleChange('email')}
            value={this.state.email}
            margin="normal"
          />
          <TextField
            required
            id="phone"
            label="Phone number"
            type="tel"
            autoComplete="tel"
            className={classes.textField}
            onChange={this.handleChange('phone')}
            value={this.state.phone}
            margin="normal"
          />
        </div>
        <Typography variant={'subtitle2'}>Car details</Typography>
        <div className={classes.formRow}>
          <TextField
            required
            id="car-make"
            label="Make"
            className={classes.textField}
            onChange={this.handleChange('carMake')}
            value={this.state.carMake}
            margin="normal"
          />
          <TextField
            required
            id="car-model"
            label="Model"
            className={classes.textField}
            onChange={this.handleChange('carModel')}
            value={this.state.carModel}
            margin="normal"
          />
          <TextField
            required
            id="car-year"
            label="Year"
            type="number"
            className={classes.textField}
            onChange={this.handleChange('carYear')}
            value={this.state.carYear}
            margin="normal"
          />
          <TextField
            id="car-km"
            label="Km"
            type="number"
            className={classes.textField}
            onChange={this.handleChange('carKm')}
            value={this.state.carKm}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Km</InputAdornment>
              ),
            }}
          />
          <TextField
            id="car-vin"
            label="VIN"
            className={classes.textField}
            onChange={this.handleChange('carVin')}
            value={this.state.carVin}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HelpIcon
                    tooltip={`The car's vehicle identification number (VIN) is the identifying code for a SPECIFIC automobile. The VIN serves as the car's fingerprint, as no two vehicles in operation have the same VIN. A VIN is composed of 17 characters (digits and capital letters) that act as a unique identifier for the vehicle. A VIN displays the car's unique features, specifications and manufacturer. The VIN can be used to track recalls, registrations, warranty claims, thefts and insurance coverage.`}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <TextField
          id="note"
          label="Notes"
          onChange={this.handleChange('notes')}
          value={this.state.notes}
          margin="normal"
          multiline
          rows="4"
          variant="outlined"
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              required
              checked={this.state.checkedTos}
              onChange={this.handleChange('checkedTos')}
              value="checkedG"
            />
          }
          label={
            <Typography>
              I have read and accept the
              <Link to="/tos" className={classes.link}>
                Terms of service
              </Link>
              *
            </Typography>
          }
        />
        <div className={classes.formRow}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
        </div>
      </form>
    );
  }
}

ServiceForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceForm);
