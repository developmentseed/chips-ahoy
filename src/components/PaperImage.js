import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const styles = theme => ({
  content: {
    height: 'auto'
  }
});
class PaperImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    }
    this.resizeHandler = this.resizeHandler.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler() {
    const width = this.divElement.clientWidth;
    const height = this.divElement.clientHeight;
    this.setState({ width, height });
  }
  
  handleImageClick(e) {
    e.stopPropagation()
    console.log(e,e.target)
    const currentCoord = { x: e.clientX, y: e.clientY };
    const rect = this.image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(currentCoord, "x: " + x + " y: " + y);
  }

  render() {
    const { classes, feature } = this.props;
    const { width } = this.state;
    return (
      <div className={classes.content} ref={(divElement) => { this.divElement = divElement }} >
        {feature && feature.properties.url ?
          <img 
          ref={(c) => { this.image = c }}
          src={feature.properties.url} 
          onClick={this.handleImageClick}
          width={width}
          height="auto"
          />
          : null}
      </div>
    );

  }
}


const mapStateToProps = state => ({
  data: state.geojsonData.data,
  feature: state.geojsonData.feature,
  index: state.geojsonData.index,
  totalFeatures: state.geojsonData.totalFeatures,
  fileName: state.geojsonData.fileName,
  downloadFile: state.control.downloadFile

});
const mapDispatchToProps = {

}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PaperImage);
