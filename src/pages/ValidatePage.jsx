import { Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { fetchFeature, preloadImages, updateFeature, updateIndex } from '../actions/dataActions';
import styles from './validate/style';
import SidebarValidate from './shared/sidebar/SidebarValidate.jsx';



class ValidatePage extends Component {
  constructor(props) {
    super(props);
  }

  renderData() {
    const { classes } = this.props;

    return (
      <>
        {itemData.map((item, index) => (
          <Grid item xs={4}>
            <Paper className={classes.paperImage}>
              <img
                className={classes.image}
                key={index}
                src={item.img}
                alt={item.img}
                height="auto"
                width="100%"
              />
            </Paper>
          </Grid>
        ))}
      </>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={10} lg={10} xl={10}>
              <Grid container className={classes.containerImages} spacing={1}>
                {this.renderData()}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
              <Paper
                className={clsx(classes.paper, classes.fixedHeight, classes.overflowNone)}
                elevation={3}>
                <SidebarValidate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.geojsonData.data,
  feature: state.geojsonData.feature,
  index: state.geojsonData.index,
  totalFeatures: state.geojsonData.totalFeatures,
  fileName: state.geojsonData.fileName,
  downloadFile: state.control.downloadFile
});
const mapDispatchToProps = {
  fetchFeature,
  updateIndex,
  updateFeature,
  preloadImages
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ValidatePage);
