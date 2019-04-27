import React from 'react';
import { HelpOutline } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import {grey} from "@material-ui/core/colors";

const styles = () => ({
  icon: {
    fill: grey[400]
  },
});

const HelpIcon = props => {
  const { classes, tooltip } = props;
  return (
    <Tooltip title={tooltip}>
      <HelpOutline className={classes.icon} />
    </Tooltip>
  );
};

HelpIcon.propTypes = {
  tooltip: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelpIcon);
