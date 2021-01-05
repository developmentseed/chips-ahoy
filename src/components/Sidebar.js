import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  MenuList,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import { FreeBreakfastIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Loadfile from './Loadfile';
import { setIndex } from '../actions/dataActions';

const styles = theme => ({
  title: {
    fontSize: 12,
    alignItems: 'center',
    marginTop: '5px'
  },
  legendSpan: {
    display: 'block',
    height: '25px',
    width: '60px',
    textAlign: 'center',
    alignItems: 'center',
    color: '#808080'
  },
  secondary: {
    textAlign: 'right',
  },
  primaryText: {
    textAlign: 'center',
    color: '#808080',
  }
});

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.featureproptipes = this.featureproptipes.bind(this);

  }

  handleChange(e) {
    const { total, setIndex } = this.props;
    const re = /[0-9]+/g;
    let value = e.target.value;
    if (value === '' || re.test(value)) {
      value = parseInt(value)
      if (total >= value && value >= 0) {
        // this.setState({value})
        setIndex(value)
      }
      return;
    }
  }

  featureproptipes() {
    const { feature, classes } = this.props;
    if (!feature && !feature.properties) return null;
    return (
      <>
        <ListItem >
          <ListItemText
            primary="Properties"
            classes={{ primary: classes.primaryText }}
          />
        </ListItem>
        {Object.keys(feature.properties || {}).map((l, k) => (
          <ListItem >
            <ListItemText
              primary={l}
              key={k}
              classes={{ secondary: classes.secondary }}
              secondary={
                <React.Fragment
                >
                  <Typography
                    variant="body1"
                    component="span"
                    color="textSecondary"
                  >
                    {feature.properties[l]}
                  </Typography>
                </React.Fragment>}
            />
          </ListItem>
        ))}
      </>
    )
  }


  render() {
    const { feature, total, index, classes } = this.props;
    return (
      <div>
        {!feature ? <Loadfile /> :
          (<>
            <MenuList>
              <MenuItem>
                <TextField
                  id="index"
                  label="Index"
                  onChange={this.handleChange}
                  value={index}
                />
              </MenuItem>
              <Divider />
            </MenuList>
            <List component="nav" >
              <ListItem >
                <ListItemText
                  primary="Total"
                  key='total'
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
              </ListItem>
              <ListItem >
                <ListItemText
                  primary="Properties"
                  classes={{ primary: classes.primaryText }}
                />
              </ListItem>
              <ListItem >
                <ListItemText
                  primary={feature.properties}
                  classes={{ primary: classes.primaryText }}
                />
              </ListItem>
              {Object.keys(feature.properties || {}).map((l, k) => (
                <ListItem >
                  <ListItemText
                    primary={l}
                    key={k}
                    classes={{ secondary: classes.secondary }}
                    secondary={
                      <React.Fragment
                      >
                        <Typography
                          variant="body1"
                          component="span"
                          color="textSecondary"
                        >
                          {feature.properties[l]}
                        </Typography>
                      </React.Fragment>}
                  />
                </ListItem>
              ))}
            </List>
          </>)}
        <Divider />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  total: state.geojsonData.totalFeatures,
  index: state.geojsonData.index,
  feature: state.geojsonData.feature,
});

const mapDispatchToProps = {
  setIndex,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Sidebar);
