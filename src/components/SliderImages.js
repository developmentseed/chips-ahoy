import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { compose } from 'recompose';

import { updateIndex } from '../actions/dataActions';

const styles = (theme) => ({
  root: {
    maxWidth: 140,
    marginLeft: 5,
    marginRight: 5,
    position: 'relative'
  },
  media: {
    height: 140
  },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 50,
    color: 'red',
    fontSize: 30
  },
  overlayReviewed: {
    filter: 'grayscale(100%)'
  },
  overlayUsed: {
    filter: 'sepia()'
  }
});

class SliderImages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClickCardAction = this.handleClickCardAction.bind(this);
  }

  handleClickCardAction(e, i) {
    e.preventDefault();
    this.props.dispatch(updateIndex(i));
  }

  render() {
    const { classes, data, index } = this.props;

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 4,
      initialSlide: index,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    if (data.features.length === 0) return null;

    return (
      <Slider {...settings}>
        {data.features.map((geo, i) => (
          <Card className={classes.root} key={i}>
            <CardActionArea onClick={(e) => this.handleClickCardAction(e, i)}>
              <CardMedia
                className={clsx(
                  classes.media,
                  geo.properties.isreviewed && classes.overlayReviewed,
                  i === index && classes.overlayUsed
                )}
                image={geo.properties.url}
                title="Image"
              />
              <div className={classes.overlay}>{i}</div>
            </CardActionArea>
          </Card>
        ))}
      </Slider>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.geojsonData.data,
  index: state.geojsonData.index,
  totalFeatures: state.geojsonData.totalFeatures
});

export default compose(connect(mapStateToProps), withStyles(styles))(SliderImages);
