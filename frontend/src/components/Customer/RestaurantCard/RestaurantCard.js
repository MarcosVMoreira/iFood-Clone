import { Card, Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { categories } from '../../../helpers/enums';
import classes from './RestaurantCard.module.scss';

export const RestaurantCard = props => {
  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.card_grid}>
        <img
          className={classes.card_logo}
          src={props.logo}
          alt="restaurant logo"
        />

        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          className={classes.card_info}
        >
          <Grid item>
            <span className={classes.card_title}>{props.name}</span>
          </Grid>

          <Grid item className={classes.card_subtitle}>
            <div className={classes.card_rating}>
              <Rating max={1} readOnly value={1} size="small" />
              <span className={classes.card_rate}>
                {props.rate ? props.rate.toFixed(1).replace('.', ',') : 'Novo'}
              </span>
            </div>
            <span className={classes.card_separator}> • </span>
            <span className={classes.card_category}>
              {categories[props.type[0]]}
            </span>
            <span className={classes.card_separator}> • </span>

            <span className={classes.card_text}>
              {props.distance.toFixed(1).replace('.', ',')} km
            </span>
          </Grid>

          <Grid item className={classes.card_subtitle}>
            <span className={classes.card_text}>
              {props.duration.toFixed(0).replace('.', ',')} min
            </span>
            <span className={classes.card_separator}> • </span>
            {props.fee !== 0.0 ? (
              <span className={classes.card_text}>
                R${props.fee.toFixed(2).replace('.', ',')}
              </span>
            ) : (
              <span className={classes.card_free}>Grátis</span>
            )}
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};
