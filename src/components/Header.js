import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Weekend } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { downloadGeojsonFile } from '../actions/controlAction';
import styles from '../style/HomeStyles';

class Header extends Component {
  constructor() {
    super();
    this.downloadFile = this.downloadFile.bind(this);
  }

  downloadFile() {
    this.props.dispatch(downloadGeojsonFile(true));
  }

  render() {
    const { classes, fileName, totalFeatures } = this.props;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={clsx(classes.menuButton)}>
            <Weekend />
          </IconButton>
          <Typography variant="h6" noWrap>
            CHIP-AHOY
          </Typography>
          <Typography variant="subtitle2" className={classes.nameFile}>
            {fileName}
          </Typography>
          {totalFeatures !== 0 ? (
            <Button className={classes.button} color="inherit" onClick={this.downloadFile}>
              Download
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  fileName: state.geojsonData.fileName,
  totalFeatures: state.geojsonData.totalFeatures
});

export default compose(connect(mapStateToProps), withStyles(styles))(Header);
