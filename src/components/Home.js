import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Header from './Header';
import MainPage from './MainPage';
import styles from './../style/HomeStyles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.state = { open: true };
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  render() {
    // const open =true;
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Header handleDrawerOpen={this.handleDrawerOpen} open={open} />
        <MainPage />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Home);
