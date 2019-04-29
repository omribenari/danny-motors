import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import fire, {collections} from '../fire';
import * as firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import ResponsiveDialog from "./ResponsiveDialog";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
});

const serviceTypes = [
  'Oil Change',
  'Engine Tuneup',
  'Balance Tires',
  'Adjust Brakes',
  'Air Conditioner Repair',
  'Other Service'
];

const AddServiceDialog = props => {
  const { open, handleClose, classes, cars } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [serviceTime, setServiceTime] = useState('2017-05-24T10:30');

  const saveCar = () => {
    setIsSaving(true);

    fire
      .firestore()
      .collection(collections.USERS_INFO)
      .doc(fire.auth().currentUser.uid)
      .update({
        "Services": firebase.firestore.FieldValue.arrayUnion({
          car: selectedCar,
          serviceType: serviceType,
        }),
      })
      .then(() => {
        setIsSaving(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error.message);
        setIsSaving(false);
      });
  };

  return (
    <ResponsiveDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="New service request"
    >
      <DialogTitle id="responsive-dialog-title">{'New service request'}</DialogTitle>
      <DialogContent>
        <form
          noValidate
          autoComplete="off"
          className={classes.container}
        >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="add-service-selected-car">Select car</InputLabel>
            <Select
              value={selectedCar}
              onChange={e => setSelectedCar(e.target.value)}
              inputProps={{
                name: 'selectedCar',
                id: 'add-service-selected-car',
              }}
            >
              {cars.map(car => (
                <MenuItem key={car.LicensePlate} value={car}>{`${car.Make} ${car.Model}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="add-service-type">Service type</InputLabel>
            <Select
              value={serviceType}
              onChange={e => setServiceType(e.target.value)}
              inputProps={{
                name: 'selectedCar',
                id: 'add-service-type',
              }}
            >
              {serviceTypes.map(item => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="datetime-local"
            label="Wanted time"
            type="datetime-local"
            value={serviceTime}
            onChange={e => setServiceTime(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />


        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" autoFocus>
          Cancel
        </Button>
        <Button color="primary" type="submit" disabled={isSaving} onClick={saveCar}>
          {isSaving ? (
            <CircularProgress className={classes.progress} />
          ) : (
            'Save'
          )}
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  );
};

AddServiceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  classes: PropTypes.object.isRequired,
  cars: PropTypes.array.isRequired,
};

export default withStyles(styles)(AddServiceDialog);
