import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { Drawer, Typography, Divider, IconButton, AppBar } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Header from './Header';
import MainPage from './MainPage';
import styles from './../style/HomeStyles';
import Sidebar from './Sidebar';

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
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>          <Header handleDrawerOpen={this.handleDrawerOpen} open={open} />
          <Drawer
            variant='persistent'
            anchor='left'
            open={open}
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
          >
            <div className={classes.drawerHeader}>
              <Typography gutterBottom component='h3'>
                CHIP AHOY
          </Typography>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <Sidebar />
          </Drawer>
          <MainPage />
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Home);
