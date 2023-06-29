import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import CustomLink from './CustomLink.jsx';
import styles from './styles';

class HeaderLinks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, index, filter } = this.props;

    return (
      <Typography className={classes.rootLinks}>
        <CustomLink
          to={{
            pathname: '/',
            search: `?index=${index || ''}`
          }}
        >
          Annotate
        </CustomLink>
        <CustomLink
          to={{
            pathname: '/validate',
            search: `?${queryString.stringify({ ...filter })}`
          }}
        >
          Validate
        </CustomLink>
      </Typography>
    );
  }
}

const mapStateToProps = (state) => ({
  index: state.geojsonData.index,
  filter: state.geojsonData.filter
});
const mapDispatchToProps = {};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(HeaderLinks);
