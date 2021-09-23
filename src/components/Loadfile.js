import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Files from 'react-files';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { fetchData } from './../actions/dataActions';

const styles = (theme) => ({
  container: {
    height: 250,
    padding: theme.spacing(2)
  }
});
class Loadfile extends Component {
  constructor(props) {
    super(props);
    this.onFilesChange = this.onFilesChange.bind(this);
  }

  onFilesChange(files) {
    this.props.dispatch(fetchData(files));
  }

  onFilesError(error) {
    console.error('error code ' + error.code + ': ' + error.message);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="caption" display="block" gutterBottom>
          Load geojson file
        </Typography>
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
      </div>
    );
  }
}

export default compose(connect(null), withStyles(styles))(Loadfile);
