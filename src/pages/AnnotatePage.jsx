import { Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { v4 as uuidv4 } from 'uuid';

import { fetchFeature, preloadImages, updateFeature, updateIndex } from '../actions/dataActions';
import styles from '../style/general';
import { getNextIndex, getPrevIndex, getPropFeature, parseSearchNumber } from '../utils/utils';
import PaperImage from './annotate/PaperImage.jsx';
import SidebarAnnotate from './shared/sidebar/SidebarAnnotate.jsx';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.keyFunction = this.keyFunction.bind(this);
    this.updateFeatureKey = this.updateFeatureKey.bind(this);
  }
  componentDidMount() {
    const { history, updateIndex, totalFeatures } = this.props;

    // key event
    document.addEventListener('keydown', this.keyFunction, false);
    // query string
    const parsed = parseSearchNumber(history);
    if (parsed.index && parsed.index >= 0) {
      if (totalFeatures) {
        updateIndex(parsed.index, history);
      } else {
        history.replace({ search: '' });
      }
    }
  }
  componentWillUnmount() {
    // key event
    document.removeEventListener('keydown', this.keyFunction, false);
  }

  updateFeatureKey(value) {
    const { feature, updateFeature, setup_data } = this.props;
    const { fieldProperties } = setup_data;

    if (!feature) return;
    let newFatureProps = getPropFeature(Object(feature), fieldProperties);

    // category
    const old_value = !!newFatureProps[value];

    newFatureProps[value] = !old_value;
    newFatureProps.uuid_difference = uuidv4();
    [('pointScale', 'sizeImage')].forEach((i) => {
      if (newFatureProps[i]) {
        delete newFatureProps[i];
      }
    });
    if (fieldProperties && fieldProperties !== '') {
      updateFeature({ ...feature, [fieldProperties]: { ...newFatureProps } });
    } else {
      updateFeature({ ...newFatureProps });
    }
  }

  keyFunction(event) {
    const { updateIndex, index, data, totalFeatures, preloadImages, setup_data, history } =
      this.props;
    // const shift = event.shiftKey;
    const key = `${event.key}`.toLocaleLowerCase();
    if (!totalFeatures) return;

    // generic
    switch (key) {
      case 'arrowright':
        updateIndex(index + 1, history);
        preloadImages(index, [...data], totalFeatures);
        break;
      case '2':
        updateIndex(index + 1, history);
        break;
      case 'arrowleft':
        updateIndex(index - 1, history);
        break;
      case '1':
        updateIndex(index - 1, history);
        break;
      case 'd':
        updateIndex(getNextIndex(index, [...data], setup_data.fieldProperties), history);
        break;
      case 'a':
        updateIndex(getPrevIndex(index, [...data], setup_data.fieldProperties), history);
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
              <Paper className={clsx(fixedHeightPaper, classes.overflowY)} elevation={3}>
                <SidebarAnnotate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  feature: state.data.feature,
  index: state.data.index,
  totalFeatures: state.data.totalFeatures,
  setup_data: state.annotationSeed.setup_data
});
const mapDispatchToProps = {
  fetchFeature,
  updateIndex,
  updateFeature,
  preloadImages
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MainPage);
