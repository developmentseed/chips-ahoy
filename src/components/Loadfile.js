import React, { Component } from 'react';
import Files from 'react-files';
import { connect } from 'react-redux';
import { fetchData } from './../actions/dataActions';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Loadfile extends Component {
  constructor (props) {
    super(props);
    this.onFilesChange = this.onFilesChange.bind(this);
  }

  onFilesChange (files) {
    this.props.dispatch(fetchData(files));
  }

  onFilesError (error, file) {
    console.err('error code ' + error.code + ': ' + error.message);
  }

  render () {
    return (
      <>
        <Typography variant='caption' display='block' gutterBottom>
          Load geojson file
        </Typography>
        <Paper>
          <Files
            className='files-dropzone-list'
            onChange={this.onFilesChange}
            onError={this.onFilesError}
            accepts={['.geojson', '.json']}
            maxFiles={1}
            maxFileSize={1000000000}
            minFileSize={0}
            clickable
          >
            <input type='submit' value='Choose a file' style={{ width: '96%', margin: '5px' }} />
          </Files>
        </Paper>
      </>
    );
  }
}

export default connect(null)(Loadfile);
