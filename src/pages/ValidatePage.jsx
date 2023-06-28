import {
  Container,
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { fetchFeature, preloadImages, updateFeature, updateIndex } from '../actions/dataActions';
import SidebarValidate from './shared/sidebar/SidebarValidate.jsx';
import FeatureCard from './validate/FeatureCard';
import styles from './validate/style';
import { filterDataDict } from '../utils/utils';
import nodata from '../assets/nodata.jpg';

class ValidatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFilter: []
    };
  }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   const { filter, data } = this.props;
  //   if (nextProps.filter !== filter) {
  //     this.setState({
  //       dataFilter: filterDataDict(data.features, 'properties', nextProps.filter)
  //     });
  //   }
  // }
  renderData() {
    const { classes, filter, data } = this.props;
    const paperStyle = clsx(classes.paper, classes.fixedHeight);

    const dataFilter = filterDataDict(data.features, 'properties', filter);
    if (dataFilter.length === 0) {
      return (
        <Paper className={paperStyle} elevation={3}>
          <img className={classes.imageunavailable} src={nodata} alt="img" />
        </Paper>
      );
    }
    return (
      <Grid container className={classes.containerImages} spacing={1}>
        {dataFilter.map((item) => (
          <FeatureCard key={item.uuid_id_} feature={item} />
        ))}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    const papperStyle = clsx(classes.paper, classes.fixedHeight, classes.overflowNone);
    return (
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={10} lg={10} xl={10}>
              {this.renderData()}
            </Grid>
            <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
              <Paper className={papperStyle} elevation={3}>
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
  filter: state.geojsonData.filter,

  index: state.geojsonData.index,
  totalFeatures: state.geojsonData.totalFeatures
});
const mapDispatchToProps = {
  fetchFeature,
  updateIndex,
  updateFeature
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ValidatePage);
