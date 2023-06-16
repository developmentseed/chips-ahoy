import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { tokeUrl } from '../actions/dsAnnotate';
import styles from './../style/HomeStyles';
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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header handleDrawerOpen={this.handleDrawerOpen} />
        <MainPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token_decode: state.dsAnnotate.token_url_decode
});
const mapDispatchToProps = {
  tokeUrl
};
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Home);
