import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FireCon } from '../common/FireCon';

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
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    minWidth: 200,
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
      name: '',
      email: '',
      phone: '',
      carMake: '',
      carModel: '',
      carYear: '',
      carKm: '',
      carLP: '',
      notes: '',
      checkedTos: false,
      isAnonymous: undefined,
      uid: undefined,
      carsData: [],
      makeModels: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
    this.handleCarMakeChange = this.handleCarMakeChange.bind(this);
  }

  componentWillMount() {
    FireCon.getCarMake().then(querySnapshot => {
      this.setState({ carsData: querySnapshot.docs.map(doc => doc.data()) });
    });
  }

  clearForm() {
    this.setState({
      isSubmitting: false,
      isComplete: false,
      name: '',
      email: '',
      phone: '',
      carMake: '',
      carModel: '',
      carYear: '',
      carKm: '',
      carLP: '',
      notes: '',
      checkedTos: false,
    });
  }

  getFormDataFromState() {
    return {
      client: {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
      },
      car: {
        Make: this.state.carMake,
        Model: this.state.carModel,
        Year: this.state.carYear,
        Km: this.state.carKm,
        LicensePlate: this.state.carLP,
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

    const user = FireCon.getCurrentUser();
    if (!user) {
      FireCon.signInAnonymously().catch(() => {
        alert('error connecting to server');
      });
    }

    const data = this.getFormDataFromState();
    /* Send the form to Firebase */
    FireCon.addGuestServiceReq(data)
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

  handleCarMakeChange(event) {
    const value = event.target.value;
    this.setState({
      carMake: value,
    });
    const make = this.state.carsData.find(m => m.Name === value);
    if (make) {
      this.setState({ makeModels: make.Models });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      isSubmitting,
      isComplete,
      carMake,
      carModel,
      carsData,
      makeModels,
    } = this.state;

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
            id="full-name"
            label="Full name"
            className={classes.textField}
            onChange={this.handleChange('name')}
            value={this.state.name}
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
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="service-req-car-make">Car make</InputLabel>
            <Select
              value={carMake}
              onChange={this.handleCarMakeChange}
              inputProps={{
                name: 'selectedCarMake',
                id: 'service-req-car-make',
              }}
            >
              {carsData.map(item => (
                <MenuItem key={item.Name} value={item.Name}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="service-req-car-model">Car model</InputLabel>
            <Select
              value={carModel}
              onChange={this.handleChange('carModel')}
              disabled={!carMake || carMake === ''}
              inputProps={{
                name: 'selectedModel',
                id: 'service-req-car-model',
              }}
            >
              {makeModels.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            id="car-lp"
            label="Licence plate"
            className={classes.textField}
            onChange={this.handleChange('carLP')}
            value={this.state.carLP}
            margin="normal"
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
