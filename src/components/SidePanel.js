import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Loadfile from './Loadfile';
import {updateIndex} from '../actions/dataActions';

const styles = theme => ({
  lItem:{
    paddingBottom:0,
    paddingRight:0,
    paddingLeft:0
  },
  primaryText: {
    textAlign: 'center',
    color: '#808080',
  }
});

class SidePanel extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    const { total } = this.props;
    const re = /[0-9]+/g;
    let value = e.target.value;
    if (value === '' || re.test(value)) {
      value = parseInt(value)
      if (total >= value && value >= 0) {
        this.props.dispatch(updateIndex(value))
      }
      return;
    }
  }
  renderProperties() {
    const { classes, feature } = this.props;
    if (!feature || !feature.properties) return null;
    return (
      <>
        {Object.keys(feature.properties || {}).map((l, k) => (
          <ListItem key={`li-${k}`} className={classes.lItem}>
            <ListItemText
              primary={l}
              secondary={feature.properties[l]}
            />
          </ListItem>
        ))}
      </>
    )
  }

  renderFeature() {
    const { classes, feature } = this.props;
    if (!feature || !feature.properties) return null;
    return (
      <>
        <ListItem>
          <ListItemText
            primary="Properties"
            classes={{ primary: classes.primaryText }}
          />
        </ListItem>
        {this.renderProperties()}
      </>
    )
  }

  render() {
    const { classes, total, index, feature } = this.props;

    return (
      <div>
        {!feature ? <Loadfile /> : null}
        {feature ? (<List component="nav" >
          <ListItem  >
            <TextField
              id="index"
              label="Index"
              onChange={this.handleChange}
              value={index}
              type="number"
            />
          </ListItem>
          <Divider />
        </List>) : null}
        <List component="nav" >
          {total !== 0 ? (
          <ListItem  className={classes.lItem}>
            <ListItemText
              primary="Total"
            />
            <ListItemSecondaryAction>
              <Typography
                variant="body1"
                component="span"
                color="textSecondary"
              >
                {total}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>) : null}
          {this.renderFeature()}
        </List>
        <Divider />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  total: state.geojsonData.totalFeatures,
  index: state.geojsonData.index,
  feature: state.geojsonData.feature
});



export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(SidePanel);
