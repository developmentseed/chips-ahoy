import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { tokeUrl } from '../actions/dsAnnotate';
import styles from './../style/HomeStyles';
import BlankPage from './BlankPage';
import Header from './Header';
import MainPage from './MainPage';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { token_url, tokeUrl } = this.props;
    tokeUrl(token_url);
  }
  render() {
    // const open =true;
    const { classes, has_access } = this.props;
    if (!has_access) {
      return (
        <div className={classes.root}>
          <Header handleDrawerOpen={this.handleDrawerOpen} />
          <BlankPage />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Header handleDrawerOpen={this.handleDrawerOpen} />
        <MainPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  has_access: state.dsAnnotate.has_access
});
const mapDispatchToProps = {
  tokeUrl
};
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Home);
