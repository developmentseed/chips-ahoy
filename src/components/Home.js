import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import styles from './../style/HomeStyles';
import Header from './Header';
import MainPage from './MainPage';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const open =true;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header handleDrawerOpen={this.handleDrawerOpen} />
        <MainPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default compose(connect(mapStateToProps), withStyles(styles))(Home);
