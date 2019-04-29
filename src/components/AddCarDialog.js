import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/es/withMobileDialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import fire, {collections} from '../fire';
import * as firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

const ResponsiveDialog = withMobileDialog({ breakpoint: 'xs' })(Dialog);

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

const AddCarDialog = props => {
  const { open, handleClose, classes } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carKm, setCarKm] = useState('');
  const [carLP, setCarLP] = useState('');

  const saveCar = () => {
    setIsSaving(true);

    fire
      .firestore()
      .collection(collections.USERS_INFO)
      .doc(fire.auth().currentUser.uid)
      .update({
        "Cars": firebase.firestore.FieldValue.arrayUnion({
          Make: carMake,
          Model: carModel,
          Year: carYear,
          Km: carKm,
          LicensePlate: carLP,
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
      aria-labelledby="Add car form"
    >
      <DialogTitle id="responsive-dialog-title">{'Add new car'}</DialogTitle>
      <DialogContent>
        <form
          noValidate
          autoComplete="off"
          className={classes.container}
        >
          <TextField
            required
            id="car-make"
            label="Make"
            className={classes.textField}
            onChange={e => setCarMake(e.target.value)}
            value={carMake}
            margin="normal"
          />
          <TextField
            required
            id="car-model"
            label="Model"
            className={classes.textField}
            onChange={e => setCarModel(e.target.value)}
            value={carModel}
            margin="normal"
          />
          <TextField
            required
            id="car-year"
            label="Year"
            type="number"
            className={classes.textField}
            onChange={e => setCarYear(e.target.value)}
            value={carYear}
            margin="normal"
          />
          <TextField
            id="car-km"
            label="Km"
            type="number"
            className={classes.textField}
            onChange={e => setCarKm(e.target.value)}
            value={carKm}
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
            onChange={e => setCarLP(e.target.value)}
            value={carLP}
            margin="normal"
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

AddCarDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddCarDialog);
