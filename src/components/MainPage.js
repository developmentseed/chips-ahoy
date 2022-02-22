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
import { NotificationContainer, NotificationManager } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

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
    newFature.properties.datetime = new Date().getTime();

    [('pointScale', 'sizeImage')].forEach((i) => {
      if (newFature.properties[i]) {
        delete newFature.properties[i];
      }
    });
    updateFeature(newFature);
  }

  keyFunction(event) {
    const { updateIndex, index, totalFeatures } = this.props;
    const shift = event.shiftKey;
    const key = `${event.key}`.toLocaleLowerCase();
    if (!totalFeatures) return;

    // generic
    switch (key) {
      case 'arrowright':
        updateIndex(index + 1);
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
      default:
        break;
    }

    // vacant_lots , shift == false
    if (key === 'q' && !shift) {
      NotificationManager.success('Paved');
      this.updateFeatureKey('prop_feature__vacant_lots__paved');
    }
    if (key === 'w' && !shift) {
      NotificationManager.success('Info Unpaved');
      this.updateFeatureKey('prop_feature__vacant_lots__unpaved');
    }
    if (key === 'e' && !shift) {
      NotificationManager.success('Info Overgrown');
      this.updateFeatureKey('prop_feature__vacant_lots__overgrown');
    }
    if (key === 'a' && !shift) {
      NotificationManager.success('Fenced');
      this.updateFeatureKey('prop_feature__vacant_lots__fenced');
    }
    if (key === 's' && !shift) {
      NotificationManager.success('Side Fences only');
      this.updateFeatureKey('prop_feature__vacant_lots__side_fences_only');
    }
    if (key === 'd' && !shift) {
      NotificationManager.success('Litter/dumping/Tires');
      this.updateFeatureKey('prop_feature__vacant_lots__litter_dumping_tires');
    }
    if (key === 'z' && !shift) {
      NotificationManager.success('Side Fences only');
      this.updateFeatureKey('prop_feature__vacant_lots__side_fences_only');
    }
    // Structures , shift == true
    if (key === 'q' && shift) {
      NotificationManager.success('Damaged roof');
      this.updateFeatureKey('prop_feature__structures__damaged_roof');
    }
    if (key === 'w' && shift) {
      NotificationManager.success('Broken windows / doors ');
      this.updateFeatureKey('prop_feature__structures__broken_windows_doors');
    }
    if (key === 'e' && shift) {
      NotificationManager.success('Missing windows / doors');
      this.updateFeatureKey('prop_feature__structures__missing_windows_doors');
    }
    if (key === 'a' && shift) {
      NotificationManager.success('Boarded up windows / doors ');
      this.updateFeatureKey('prop_feature__structures__boarded_up_windows_doors');
    }
    if (key === 's' && shift) {
      NotificationManager.success('Overgrown lawn ');
      this.updateFeatureKey('prop_feature__structures__overgrown_lawn');
    }
    if (key === 'd' && shift) {
      NotificationManager.success('Overgrown shrubbery/trees');
      this.updateFeatureKey('prop_feature__structures__overgrown_shrubbery_trees');
    }
    if (key === 'z' && shift) {
      NotificationManager.success('Structural issues ');
      this.updateFeatureKey('prop_feature__structures__structural_issues');
    }
    if (key === 'x' && shift) {
      NotificationManager.success('Faded paint');
      this.updateFeatureKey('prop_feature__structures__faded_paint');
    }
    if (key === 'c' && shift) {
      NotificationManager.success('Litter in / around structure');
      this.updateFeatureKey('prop_feature__structures__litter_in_around_structure');
    }
    if (key === 'v' && shift) {
      NotificationManager.success('Abandoned vehicle');
      this.updateFeatureKey('prop_feature__structures__abandoned_vehicle');
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
  updateFeature
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MainPage);
