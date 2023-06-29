import { Card, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { filterProps, fixPropName } from '../../utils/utils';

const FeatureCard = ({ feature }) => {
  const classes = useStyles();
  const { properties } = feature;
  const fields = filterProps(properties);
  const renderFields = Object.keys(fields).map((item) => (
    <Typography className={classes.field} variant="caption" key={item}>
      {fixPropName(item)}
    </Typography>
  ));

  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={properties.url} title={properties.url}>
          <div className={classes.propsContainer}>
            <div className={classes.propsContainerBotton}>{renderFields}</div>
          </div>
        </CardMedia>
      </Card>
    </Grid>
  );
};
const MEDIA_HEIGHT = 180;
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: MEDIA_HEIGHT
  },
  propsContainer: {
    height: MEDIA_HEIGHT - 10,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  propsContainerBotton: {
    display: 'block'
  },
  field: {
    backgroundColor: '#06fff4d4',
    lineHeight: 0.2,
    margin: '0px 2px',
    borderRadius: 8,
    padding: '0px 2px'
  }
}));

export default FeatureCard;
