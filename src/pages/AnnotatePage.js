import 'react-notifications/lib/notifications.css';

import { Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { v4 as uuidv4 } from 'uuid';

import { fetchFeature, preloadImages, updateFeature, updateIndex } from '../actions/dataActions';
import { getNextIndex, getPrevIndex } from '../utils/utils';
import styles from '../style/general';
import PaperImage from './annotate/PaperImage';
import SidebarAnnotate from './shared/sidebar/SidebarAnnotate';

class MainPage extends Component {
  constructor(props) {
    super(props);
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
    // const shift = event.shiftKey;
    const key = `${event.key}`.toLocaleLowerCase();
    if (!totalFeatures) return;

    // generic
    switch (key) {
      case 'arrowright':
        updateIndex(index + 1);
        preloadImages(index, { ...data }, totalFeatures);
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
        updateIndex(getNextIndex(index, [...data.features]));
        break;
      case 'a':
        updateIndex(getPrevIndex(index, [...data.features]));
        break;
      default:
        break;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { index, data, totalFeatures, fetchFeature } = this.props;
    if (nextProps.index !== index) {
      fetchFeature(nextProps.index, data, totalFeatures);
    }
  }
  
  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
                <SidebarAnnotate />
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
  fetchFeature,
  updateIndex,
  updateFeature,
  preloadImages
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MainPage);
