import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Weekend } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { downloadFile } from '../../../actions/controlAction';
import HeaderLinks from './HeaderLinks.jsx';
import ProgressBar from './ProgressBar.jsx';
import styles from './styles';

class HeaderAnnotate extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { downloadFile, data, fileName, setup_tool } = this.props;
    const { can_download_data } = setup_tool;
    if (can_download_data) {
      downloadFile(data, fileName);
    }
  }

  render() {
    const { classes, fileName, totalFeatures, setup_tool } = this.props;
    const hasFeatures = totalFeatures !== 0;
    const { can_download_data } = setup_tool;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          className={hasFeatures ? clsx(classes.toolbar) : clsx(classes.toolbar, classes.justifyCo)}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <Weekend />
            <Typography variant="h6" noWrap className={classes.appName}>
              CHIPS-AHOY
            </Typography>
          </IconButton>
          <HeaderLinks />
          <div className={classes.progressBar}>
            <ProgressBar />
            <Typography variant="caption" className={classes.nameFile}>
              {fileName}
            </Typography>
          </div>
          {can_download_data && hasFeatures ? (
            <Button className={classes.button} color="inherit" onClick={this.handleClick}>
              DOWNLOAD
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.geojsonData.data,
  fileName: state.geojsonData.fileName,
  totalFeatures: state.geojsonData.totalFeatures,
  setup_tool: state.dsAnnotate.setup_tool
});

const mapDispatchToProps = {
  downloadFile
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(HeaderAnnotate);
