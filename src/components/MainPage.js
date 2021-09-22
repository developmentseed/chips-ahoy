import { Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { saveAs } from 'file-saver';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { downloadGeojsonFile } from '../actions/controlAction';
import { fetchFeature, updateFeature, updateIndex } from '../actions/dataActions';
import styles from './../style/HomeStyles';
import PaperImage from './PaperImage';
import SidePanel from './SidePanel';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.keyFunction = this.keyFunction.bind(this);
    this.updateFeatureKey = this.updateFeatureKey.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keyFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyFunction, false);
  }

  updateFeatureKey(value) {
    const { feature, updateFeature } = this.props;
    if (!feature) return;
    let newFature = Object(feature);
    newFature.properties.dc_has_pattern_school = `${value}`;
    ['pointScale', 'sizeImage'].forEach((i) => {
      if (newFature.properties[i]) {
        delete newFature.properties[i];
      }
    });
    updateFeature(newFature);
  }

  keyFunction(event) {
    const { updateIndex, index } = this.props;
    switch (event.key) {
      case 'ArrowRight':
        updateIndex(index + 1);
        break;
      case 'd':
        updateIndex(index + 1);
        break;
      case 'ArrowLeft':
        updateIndex(index - 1);
        break;
      case 'a':
        updateIndex(index - 1);
        break;
      case '1':
        this.updateFeatureKey('no');
        break;
      case '2':
        this.updateFeatureKey('unrecognized');
        break;
      default:
        console.log('another key', event.key);
        break;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

    return (
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={4}>
              <Paper className={clsx(fixedHeightPaper, classes.overflowNone)} elevation={3}>
                <SidePanel />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={9} lg={9} xl={8}>
              <Paper className={fixedHeightPaper} elevation={3}>
                <PaperImage />
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
  downloadGeojsonFile,
  fetchFeature,
  updateIndex,
  updateFeature
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MainPage);
