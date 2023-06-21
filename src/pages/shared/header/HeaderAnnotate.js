import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Weekend } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { downloadGeojsonFile } from '../../../actions/controlAction';
import styles from './styles';
import ProgressBar from './ProgressBar';

class HeaderAnnotate extends Component {
  constructor() {
    super();
    this.downloadFile = this.downloadFile.bind(this);
  }

  downloadFile() {
    const { setup_tool } = this.props;
    const { can_download_data } = setup_tool;
    if (!can_download_data) {
      return;
    }

    this.props.dispatch(downloadGeojsonFile(true));
  }

  render() {
    const { classes, fileName, totalFeatures, setup_tool } = this.props;
    const hasFeatures = totalFeatures !== 0;
    const { can_download_data } = setup_tool;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          className={
            hasFeatures ? clsx(classes.toolbar) : clsx(classes.toolbar, classes.justifyCo)
          }>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={clsx(classes.menuButton)}>
            <Weekend />
          </IconButton>
          <Typography variant="h6" noWrap>
            CHIPS-AHOY
          </Typography>
          <Typography variant="subtitle2" className={classes.nameFile}>
            {fileName}
          </Typography>
          <ProgressBar />
          {can_download_data && hasFeatures ? (
            <Button className={classes.button} color="inherit" onClick={this.downloadFile}>
              DOWNLOAD
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  fileName: state.geojsonData.fileName,
  totalFeatures: state.geojsonData.totalFeatures,
  setup_tool: state.dsAnnotate.setup_tool
});

export default compose(connect(mapStateToProps), withStyles(styles))(HeaderAnnotate);
