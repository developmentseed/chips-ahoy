import React, { Component } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/styles';
import { AppBar, Button, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Weekend } from '@material-ui/icons';
import styles from '../style/HomeStyles';
import { downloadGeojsonFile } from '../actions/controlAction';

class Header extends Component {
  constructor() {
    super();
    this.downloadFile = this.downloadFile.bind(this);
  }

  downloadFile() {
    this.props.dispatch(downloadGeojsonFile(true));
  }

  render() {
    const { classes, fileName } = this.props;
    return (
      <AppBar
        position='fixed'
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
        <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            className={clsx(classes.menuButton)}
          >
            <Weekend />
          </IconButton>
          <Typography variant='h6' noWrap>
            CHIP-AHOY
          </Typography>
          <Typography variant='subtitle2' className={classes.nameFile}>
            { fileName }
          </Typography>
          <Button className={classes.button} color='inherit' onClick={this.downloadFile}>Download</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  labels: state.geojsonData.labels,
  currentlabel: state.geojsonData.label,
  fileName: state.geojsonData.fileName,

});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Header);
