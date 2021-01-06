import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import {  Card, CardActionArea, CardMedia } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Slider from 'react-slick';

const styles = theme => ({
  root: {
    maxWidth: 140,
    marginLeft: 8,
    marginRight: 8,
    position: 'relative',
  },
  media: {
    height: 140,
  },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 50,
    color: 'red',
    fontSize: 30
  },
  overlayUsed: {
    filter: 'grayscale(100%)'
  }
});


class SliderImages extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    const { classes, data, index,  } = this.props;

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      initialSlide: 0,
    };
    if (data.features.length === 0) return null;

    return (
      <Slider {...settings}>
        {
          data.features.map((geo, i) => (
            <Card className={classes.root} key={i}>
              <CardActionArea>
                <CardMedia
                  className={clsx(classes.media, (i === index) && classes.overlayUsed)}
                  image={geo.properties.url}
                  title="Image"
                />
                <div className={classes.overlay}>{i}</div>
              </CardActionArea>
            </Card>
          ))
        }
      </Slider>
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
)(SliderImages);
