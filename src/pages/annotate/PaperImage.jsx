/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { updateFeature } from '../../actions/dataActions';
import { PREFIX_FIELD_INTERNAL } from '../../utils/constants';
import styles from './styles';

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
    // const rect = this.image.getBoundingClientRect();
    // const x = e.clientX - rect.left;
    // const y = e.clientY - rect.top;
    // //  scale image
    // // currentWith/natutalWith
    // const scale = e.currentTarget.width / e.currentTarget.naturalWidth;
    // //  scale add properties
    let newFature = { ...feature };
    newFature[`${PREFIX_FIELD_INTERNAL}__timestamp`] = Date.now().toString();
    // newFature.dc_has_pattern_school = 'yes';
    // newFature.pointScale = Object({ x: x / scale, y: y / scale });
    // newFature.sizeImage = Object({
    //   width: e.currentTarget.naturalWidth,
    //   height: e.currentTarget.naturalHeight
    // });

    updateFeature(newFature, true);
  }

  renderDot() {
    const { feature, classes } = this.props;
    const { minor } = this.state;

    if (!(feature && feature.pointScale && feature.sizeImage)) return null;

    const { pointScale, sizeImage } = feature;
    const scaleX = minor / sizeImage.width;

    return (
      <p
        className={classes.dot}
        style={{ top: scaleX * pointScale.y, left: scaleX * pointScale.x - 20 }}>
        X
      </p>
    );
  }

  render() {
    const { classes, feature, setup_data } = this.props;
    // console.log(width, height, minor);
    let urlImage = (feature || {}).url || null;
    if (feature && setup_data.fieldProperties) {
      urlImage = feature[setup_data.fieldProperties].url;
    }

    return (
      <div
        className={classes.content}
        ref={(divElement) => {
          this.divElement = divElement;
        }}>
        {feature && urlImage ? (
          <>
            <img
              ref={(c) => {
                this.image = c;
              }}
              key={urlImage}
              src={urlImage}
              id={urlImage}
              onClick={this.handleImageClick}
              width="100%"
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
  feature: state.data.feature,
  index: state.data.index,
  totalFeatures: state.data.totalFeatures,
  setup_data: state.annotationSeed.setup_data
});

const mapDispatchToProps = {
  updateFeature
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PaperImage);
