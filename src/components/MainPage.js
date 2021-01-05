import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Container, Grid, Paper, Box, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { saveAs } from 'file-saver';
import styles from './../style/HomeStyles';
import { downloadGeojsonFile } from '../actions/controlAction';
import { fetchFeature ,updateFeature } from '../actions/dataActions';


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.onClickFeature = this.onClickFeature.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    const { index, feature, data, totalFeatures, downloadGeojsonFile, fetchFeature } = this.props;
    if (nextProps.index !== index) {
      fetchFeature(nextProps.index, data, totalFeatures)
    }
    // Download geojso file
    if (nextProps.downloadFile) {
      this.save();
      downloadGeojsonFile(false);
    }
  }
  save() {
    const { data, fileName } = this.props;

    if (data && data.features) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json;charset=utf-8' });
      saveAs(blob, fileName);
    }
  }
  onClickFeature() {
    const { feature ,updateFeature} = this.props;
    console.log(feature,this.props)
    if (feature) {
      feature.id = 'asdasdasd';
      feature.properties.algo = 'dasdasdas'
      feature.properties.algo1 = '1dasdasdas'
      feature.properties.algo3 = '2dasdasdas'
      feature.properties.algo4 = '3dasdasdas'
      feature.properties.algo5 = '4dasdasdas'
      updateFeature(feature);
    }
  }
  render() {
    const { classes, feature } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                image
                {feature ? <Button onClick={this.onClickFeature} variant="contained" color="primary">
                  add properties </Button> : null}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                new images
            </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                old images
            </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}


const mapStateToProps = state => ({
  data: state.geojsonData.data,
  feature: state.geojsonData.feature,
  index: state.geojsonData.index,
  totalFeatures: state.geojsonData.totalFeatures,
  fileName: state.geojsonData.fileName,
  downloadFile: state.control.downloadFile

});
const mapDispatchToProps = {
  downloadGeojsonFile,
  fetchFeature,
  updateFeature

}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(MainPage);
