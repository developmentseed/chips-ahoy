import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { updateFeature } from '../actions/dataActions';

const styles = (theme) => ({
  content: {
    position: 'relative',
    width: 'auto',
    height: `calc(100vh - 85px - 32px)`
  },
  dot: {
    userSelect: 'none',
    position: 'absolute',
    margin: 0,
    padding: 0,
    fontSize: 60,
    color: '#ffc107',
    height: 0,
    width: 0,
    lineHeight: 0,
    letterSpacing: 0,
    fontWeight: 200
  }
});
class PaperImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      minor: 0
    };
    this.resizeHandler = this.resizeHandler.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.renderDot = this.renderDot.bind(this);
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
    let minor = width;
    if (width >= height) {
      minor = height;
    }
    this.setState({ width, height, minor });
  }

  handleImageClick(e) {
    e.stopPropagation();

    const { feature, updateFeature } = this.props;

    // const currentCoord = { x: e.clientX, y: e.clientY };
    const rect = this.image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    //  scale image
    // currentWith/natutalWith
    const scale = e.currentTarget.width / e.currentTarget.naturalWidth;
    //  scale add properties
    let newFature = Object(feature);

    newFature.properties._has_school = 'yes';
    newFature.properties.pointScale = { x: x / scale, y: y / scale };
    newFature.properties.sizeImage = {
      x: e.currentTarget.naturalWidth,
      y: e.currentTarget.naturalHeight
    };

    updateFeature(newFature);
  }

  renderDot() {
    const { feature, classes } = this.props;
    const { minor } = this.state;

    if (!(feature && feature.properties.pointScale && feature.properties.sizeImage)) return null;
    const { pointScale, sizeImage } = feature.properties;
    const scaleX = minor / sizeImage.x;

    return (
      <p
        className={classes.dot}
        style={{ top: scaleX * pointScale.y, left: scaleX * pointScale.x - 20 }}>
        X
      </p>
    );
  }

  render() {
    const { classes, feature } = this.props;
    const { minor } = this.state;
    // console.log(width, height, minor);
    return (
      <div
        className={classes.content}
        ref={(divElement) => {
          this.divElement = divElement;
        }}>
        {feature && feature.properties.url ? (
          <>
            <img
              ref={(c) => {
                this.image = c;
              }}
              src={feature.properties.url}
              onClick={this.handleImageClick}
              width={minor}
              alt="img"
            />
            {this.renderDot()}
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  feature: state.geojsonData.feature,
  index: state.geojsonData.index,
  totalFeatures: state.geojsonData.totalFeatures
});

const mapDispatchToProps = {
  updateFeature
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PaperImage);
