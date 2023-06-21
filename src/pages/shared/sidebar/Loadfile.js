import { IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Files from 'react-files';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { fetchApiData, fetchData } from '../../../actions/dataActions';

import styles from './styles';

class Loadfile extends Component {
  constructor(props) {
    super(props);
    this.onFilesChange = this.onFilesChange.bind(this);
  }
  componentDidMount() {
    const { setup_tool, total, feature, task_id, fetchApiData } = this.props;
    const { fetch_data } = setup_tool;
    if (fetch_data && task_id && !total && !feature) {
      fetchApiData(task_id);
    }
  }
  onFilesChange(files) {
    const { fetchData } = this.props;
    fetchData(files);
  }

  onFilesError(error) {
    console.error('error code ' + error.code + ': ' + error.message);
  }

  renderLoadFileContainer() {
    const { setup_tool, classes } = this.props;
    const { can_load_data, fetch_data } = setup_tool;

    if (fetch_data) {
      return (
        <Paper elevation={2} className={classes.paperFetch}>
          <IconButton aria-label="Fetch data api">
            <Typography display="block" variant="caption" gutterBottom>
              Feching ...
            </Typography>
            <CircularProgress size={30} />
          </IconButton>
        </Paper>
      );
    }

    if (can_load_data) {
      return (
        <Paper>
          <Files
            className="files-dropzone-list"
            onChange={this.onFilesChange}
            onError={this.onFilesError}
            accepts={['.geojson', '.json']}
            maxFiles={1}
            maxFileSize={1000000000}
            minFileSize={0}
            clickable>
            <input type="submit" value="Choose a file" style={{ width: '96%', margin: '5px' }} />
          </Files>
        </Paper>
      );
    }
    return null;
  }

  render() {
    const { classes, total, feature } = this.props;
    if (feature && total) {
      return null;
    }
    return (
      <div className={classes.containerLoad}>
        <Typography variant="caption" display="block" gutterBottom>
          Load data
        </Typography>
        {this.renderLoadFileContainer()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.geojsonData.totalFeatures,
  feature: state.geojsonData.feature,
  setup_tool: state.dsAnnotate.setup_tool,
  task_id: state.dsAnnotate.task_id
});

const mapDispatchToProps = {
  fetchData,
  fetchApiData
};
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Loadfile);
