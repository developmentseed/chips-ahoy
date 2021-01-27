import { Box, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import styles from '../style/HomeStyles';

const useStyles = makeStyles({
  root: {
    height: '7px',
    '& .MuiLinearProgress-dashedColorSecondary': {
      backgroundImage: 'radial-gradient(#ed3330 0%, #ed3330 16%, transparent 62%)'
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
            root: classes.root
          }}
          {...props}
        />
      </Box>
      <Box minWidth={35}>
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
    const { totalFeatures, index } = this.props;

    if (totalFeatures === index) {
      return { completed: 0, buffer: 0 };
    }
    const completed = (index / totalFeatures) * 100;

    return { completed, buffer: completed + 20 };
  }

  render() {
    const { classes, totalFeatures } = this.props;
    const { completed, buffer } = this.calculateBuffer();

    if (totalFeatures == 0) return null;
    return (
      <div className={classes.progressbarContainer}>
        <LinearProgressWithLabel value={completed} valueBuffer={buffer} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.geojsonData.data,
  index: state.geojsonData.index,
  totalFeatures: state.geojsonData.totalFeatures
});
const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ProgressBar);
