import { Container, Grid, Paper } from '@material-ui/core';
import React, { Component } from 'react';

const FeatureWrap = ({ feature }) => {
  return (
    <Paper elevation={1}>
      <img
        ref={(c) => {
          this.image = c;
        }}
        src={feature.properties.url}
        width="100%"
        alt="img"
      />
    </Paper>
  );
};

export default FeatureWrap;
