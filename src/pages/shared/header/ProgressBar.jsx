import { Box, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import styles from './styles';

const useStyles = makeStyles({
  root: {
    height: '7px',
    '& .MuiLinearProgress-dashedColorSecondary': {
      backgroundImage: 'radial-gradient(#ed3330 0%, #ed3330 1%, transparent 2%)',
      animation: 'none',
      backgroundColor: '#ed333052'
    }
  }
});

function LinearProgressWithLabel(props) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="buffer"
          color="secondary"
          classes={{
            root: classes.flex
          }}
          {...props}
        />
      </Box>
      <Box minWidth={40}>
        <Typography variant="subtitle2">{`${Math.round(props.value * 10) / 10}%`}</Typography>
      </Box>
    </Box>
  );
}

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      buffer: 0
    };
  }

  calculateBuffer() {
    const { totalFeatures, buffer, index } = this.props;

    if (totalFeatures === index) {
      return { completed: 0, buffer: 0 };
    }
    const completed = (index / totalFeatures) * 100;
    const preload = (buffer / totalFeatures) * 100;

    return { completed, preload };
  }

  render() {
    const { classes, totalFeatures } = this.props;
    const { completed, preload } = this.calculateBuffer();

    if (totalFeatures === 0) return null;
    return (
      <div className={classes.progressbarContainer}>
        <LinearProgressWithLabel value={completed} valueBuffer={preload} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  buffer: state.data.buffer,
  index: state.data.index,
  totalFeatures: state.data.totalFeatures
});
const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ProgressBar);
