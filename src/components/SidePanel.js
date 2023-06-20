import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { v4 as uuidv4 } from 'uuid';

import { updateFeature, updateIndex } from '../actions/dataActions';
import { headerHeigth } from '../style/HomeStyles';
import Loadfile from './Loadfile';

const CHECKBOXHEIGHT = 530;
// const IMAGE_SCALE = 100;

const CustomCheckBox = withStyles({
  root: {
    paddingBottom: 4,
    paddingTop: 4
  }
})((props) => <Checkbox {...props} />);
class SidePanel extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      focus_tab: 0
      // states
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
  }

  componentDidMount() {
    const { classes_annotate } = this.props;
    // create states
    const classes_dict = classes_annotate.reduce((acc, elem) => {
      acc[elem] = false;
      return acc;
    }, {});
    this.setState({ ...classes_dict });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { classes_annotate } = this.props;

    const { feature } = nextProps;
    if (feature && feature.properties) {
      const props_state = Object.keys(feature.properties || {})
        .sort()
        .filter((i) => i.includes('prop_feature'))
        .reduce((a, v) => ({ ...a, [v]: feature.properties[v] }), {});
      // create states
      const classes_dict = classes_annotate.reduce((acc, elem) => {
        acc[elem] = false;
        return acc;
      }, {});
      this.setState({ ...classes_dict });
      let initial_state = {
        // cat 1
        ...classes_dict,
        ...props_state
      };
      this.setState({ ...initial_state });
    }
  }
  handleChangeTab(ev, focus_tab) {
    this.setState({ focus_tab });
  }

  handleChange(e) {
    const { total, updateIndex } = this.props;

    try {
      const re = /[0-9]+/g;
      let value = e.target.value;
      if (value === '' || re.test(value)) {
        value = parseInt(value);
        if (total >= value && value >= 0) {
          updateIndex(value);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleChangeCheck(e) {
    const { feature, updateFeature } = this.props;
    this.setState({
      [e.target.name]: e.target.checked
    });
    // update props feature

    let newFature = Object(feature);
    // category
    const old_value = !!newFature.properties[e.target.name];

    newFature.properties[e.target.name] = !old_value;
    newFature.properties.uuid_difference = uuidv4();

    [('pointScale', 'sizeImage')].forEach((i) => {
      if (newFature.properties[i]) {
        delete newFature.properties[i];
      }
    });
    updateFeature(newFature);
  }

  convertSecondaryText(text) {
    if (['', null, undefined].includes(text)) return '';
    if (`${typeof text}` === 'object') return JSON.stringify(text);
    return `${text}`;
  }

  renderProperties() {
    const { classes, feature } = this.props;
    if (!feature || !feature.properties) return null;
    const uuid_difference = feature.properties.uuid_difference || uuidv4();

    const properties = Object.keys(feature.properties || {})
      .sort()
      .reverse()
      .filter((i) => i.includes('prop_feature'))
      .map((i) => ({ key: `${i}`, value: feature.properties[i] }));
    return (
      <>
        {properties.map((l, k) => (
          <ListItem key={`li-${uuid_difference}-${k}`} className={classes.lItem}>
            <ListItemText
              className={classes.lItemText}
              primary={`${l.key}`
                .replace('prop_feature__', '')
                .replace('structures__', 'struc/ ')
                .replace('vacant_lots__', 'VLots/ ')
                .replace('no_blight__', 'NBlig/ ')}
            />
            <ListItemSecondaryAction>
              <Typography variant="body1" component="span" color="textSecondary">
                {this.convertSecondaryText(l.value)}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </>
    );
  }

  renderFeature() {
    const { classes, feature } = this.props;
    if (!feature || !feature.properties) return null;

    return (
      <React.Fragment>
        <ListItem>
          <ListItemText primary="Properties" classes={{ primary: classes.primaryText }} />
        </ListItem>
        {this.renderProperties()}
      </React.Fragment>
    );
  }

  renderCheckboxs() {
    const { classes, classes_annotate_dict, classes_annotate } = this.props;

    return (
      <div className={classes.canvasContainer}>
        <FormControl size="small">
          {Object.keys(classes_annotate_dict).map((i) => (
            <div key={i}>
              <label className={classes.label}>{i.replace('_', ' ')}</label>
              <FormGroup>
                {classes_annotate_dict[i].map((j) => (
                  <FormControlLabel
                    key={`prop_feature__${i}__${j}`}
                    control={
                      <CustomCheckBox
                        checked={this.state[`prop_feature__${i}__${j}`]}
                        onChange={this.handleChangeCheck}
                        name={`prop_feature__${i}__${j}`}
                      />
                    }
                    label={j}
                  />
                ))}
              </FormGroup>
            </div>
          ))}
        </FormControl>
      </div>
    );
  }

  renderTabs() {
    const { classes, feature, total } = this.props;
    if (!feature || total === 0) return null;
    return (
      <React.Fragment>
        <div className={classes.tabContainer}>{this.renderCheckboxs()}</div>
        <Divider />
      </React.Fragment>
    );
  }

  render() {
    const { classes, total, index, feature } = this.props;
    return (
      <div className={classes.container}>
        <Loadfile />
        {feature ? (
          <div className={classes.paddinBox}>
            <TextField
              id="index"
              label="Index"
              onChange={this.handleChange}
              value={index}
              type="number"
            />
            <Divider />
          </div>
        ) : null}
        {this.renderTabs()}
        <List component="div" className={classes.listfeatures}>
          {total !== 0 ? (
            <ListItem className={classes.lItem}>
              <ListItemText primary="Total" />
              <ListItemSecondaryAction>
                <Typography variant="body1" component="span" color="textSecondary">
                  {total}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ) : null}
          {this.renderFeature()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.geojsonData.totalFeatures,
  index: state.geojsonData.index,
  feature: state.geojsonData.feature,
  data: state.geojsonData.data,
  setup_tool: state.dsAnnotate.setup_tool,
  classes_annotate_dict: state.dsAnnotate.classes_annotate_dict,
  classes_annotate: state.dsAnnotate.classes_annotate
});
const mapDispatchToProps = {
  updateFeature,
  updateIndex
};

const styles = (theme) => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  listfeatures: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: `calc(100vh - 64px - 32px - 70px - ${CHECKBOXHEIGHT}px - ${headerHeigth * 1.7}px)`,
    overflow: 'auto',
    width: '100%',
    padding: theme.spacing(2),
    paddingRight: 0
  },
  tabContainer: {
    minHeight: CHECKBOXHEIGHT + 5,
    padding: 0
  },
  chartContainer: {
    height: CHECKBOXHEIGHT,
    padding: 0
  },
  lItem: {
    paddingBottom: 2,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 2,

    wordWrap: 'break-word'
  },
  lItemText: {
    marginBottom: 2,
    marginTop: 2
  },
  primaryText: {
    textAlign: 'center',
    color: '#808080'
  },
  secondaryText: {
    color: 'red',
    fontSize: '1rem'
  },
  paddinBox: {
    padding: theme.spacing(2)
  },
  canvasContainer: {
    textAlign: 'left',
    padding: 8
    // height: CHECKBOXHEIGHT
  },
  image: {
    maxHeight: CHECKBOXHEIGHT
  },
  label: {
    fontSize: '1rem',
    fontWeight: 600
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SidePanel);
