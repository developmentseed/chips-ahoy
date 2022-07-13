import 'react-notifications/lib/notifications.css';

import { Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { saveAs } from 'file-saver';
import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { v4 as uuidv4 } from 'uuid';

import { downloadGeojsonFile } from '../actions/controlAction';
import { fetchFeature, preloadImages, updateFeature, updateIndex } from '../actions/dataActions';
import { getNextIndex, getPrevIndex } from '../utils/utils';
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
    // category
    const old_value = !!newFature.properties[value];

    newFature.properties[value] = !old_value;
    newFature.properties.uuid_difference = uuidv4();
    [('pointScale', 'sizeImage')].forEach((i) => {
      if (newFature.properties[i]) {
        delete newFature.properties[i];
      }
    });
    updateFeature(newFature);
  }

  keyFunction(event) {
    const { updateIndex, index, data, totalFeatures, preloadImages } = this.props;
    const shift = event.shiftKey;
    const key = `${event.key}`.toLocaleLowerCase();
    if (!totalFeatures) return;

    // generic
    switch (key) {
      case 'arrowright':
        updateIndex(index + 1);
        const newData = { ...data };
        preloadImages(index, newData, totalFeatures);
        break;
      case '2':
        updateIndex(index + 1);
        break;
      case 'arrowleft':
        updateIndex(index - 1);
        break;
      case '1':
        updateIndex(index - 1);
        break;
      case 'd':
        const nexIndex = getNextIndex(index, [...data.features]);
        updateIndex(nexIndex);
        break;
      case 'a':
        const prevIndex = getPrevIndex(index, [...data.features]);
        updateIndex(prevIndex);
        break;
      default:
        break;
    }
    console.log(' key', key, 'shiftKey', shift);
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
      let dataUpdate = {
        ...data,
        features: data.features.map((feat) => {
          const prop_feats = Object.keys(feat.properties || {})
            .filter((i) => i.includes('prop_feature'))
            .map((i) => ({ key: `${i}`, value: feat.properties[i] }));

          const feat_cat = {
            sub_category: prop_feats.filter((j) => j.value).map((j) => j.key.split('__')[2]),
            category: [
              ...new Set(prop_feats.filter((j) => j.value).map((j) => j.key.split('__')[1]))
            ]
          };
          const new_feat = { ...feat, properties: { ...feat.properties, ...feat_cat } };
          return new_feat;
        })
      };
      const blob = new Blob([JSON.stringify(dataUpdate)], {
        type: 'application/json;charset=utf-8'
      });
      saveAs(blob, fileName);
    }
  }
  render() {
    const { classes, feature } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    console.log(feature);
    return (
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={10} lg={10} xl={10}>
              <Paper className={fixedHeightPaper} elevation={3}>
                <PaperImage />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <Paper className={clsx(fixedHeightPaper, classes.overflowNone)} elevation={3}>
                <SidePanel />
              </Paper>
            </Grid>
          </Grid>
          <NotificationContainer />
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
  updateFeature,
  preloadImages
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MainPage);
