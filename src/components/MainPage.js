import { Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { saveAs } from 'file-saver';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { downloadGeojsonFile } from '../actions/controlAction';
import { fetchFeature, updateIndex } from '../actions/dataActions';
import styles from './../style/HomeStyles';
import PaperImage from './PaperImage';
import SidePanel from './SidePanel';
import SliderImages from './SliderImages';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.keyFunction = this.keyFunction.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keyFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyFunction, false);
  }
  keyFunction(event) {
    const { updateIndex, index } = this.props;
    switch (event.key) {
      case 'ArrowRight':
        updateIndex(index + 1);
        break;
      case 'ArrowLeft':
        updateIndex(index - 1);
        break;
      default:
        console.log('otra tecla', event.key, index);
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { index, data, totalFeatures, downloadGeojsonFile, fetchFeature } = this.props;
    if (nextProps.index !== index) {
      fetchFeature(nextProps.index, data, totalFeatures);
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
      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json;charset=utf-8'
      });
      saveAs(blob, fileName);
    }
  }
  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightSlider = clsx(classes.paper, classes.fixedHeightSlider);

    return (
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9} lg={9}>
              <Paper className={fixedHeightPaper} elevation={3}>
                <PaperImage />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Paper className={fixedHeightPaper} elevation={3}>
                <SidePanel />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <div className={fixedHeightSlider}>
                <SliderImages />
              </div>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.geojsonData.data,
  index: state.geojsonData.index,
  totalFeatures: state.geojsonData.totalFeatures,
  fileName: state.geojsonData.fileName,
  downloadFile: state.control.downloadFile
});
const mapDispatchToProps = {
  downloadGeojsonFile,
  fetchFeature,
  updateIndex
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MainPage);
