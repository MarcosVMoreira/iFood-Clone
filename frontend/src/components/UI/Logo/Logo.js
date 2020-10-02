import { Grid } from '@material-ui/core';
import React from 'react';

import classes from './Logo.module.scss';
import logo from '../../../assets/icons/logo.webp';

export const Logo = props => (
  <Grid item className={classes.container}>
    <img
      src={logo}
      alt="ifood clone logo"
      className={classes.logo}
      onClick={props.handleReset}
    />
  </Grid>
);
