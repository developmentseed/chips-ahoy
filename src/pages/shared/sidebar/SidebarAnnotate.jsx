import {
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

import { updateFeature, updateIndex } from '../../../actions/dataActions';
import { PREFIX_FIELD } from '../../../utils/constants';
import CustomCheckBox from './CustomCheckBox.jsx';
import Loadfile from './Loadfile.jsx';
import styles from './styles';
import {
  listClassesAnnotate2State,
  filterFieldsPrefix,
  getPropFeature
} from '../../../utils/utils';

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
    const { classes_annotate, feature, setup_data } = this.props;
    const { fieldProperties } = setup_data;
    // create states
    let classes_dict = listClassesAnnotate2State(classes_annotate);

    if (feature && feature !== {}) {
      const props_state = filterFieldsPrefix(getPropFeature(feature, fieldProperties));

      classes_dict = { ...classes_dict, ...props_state };
    }
    this.setState({ ...classes_dict });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { classes_annotate, setup_data } = this.props;
    const { fieldProperties } = setup_data;
    const { feature } = nextProps;
    if (!feature || feature === {}) return;

    let newFeature = getPropFeature(feature,fieldProperties );

    const props_state = filterFieldsPrefix(newFeature);
    // create states
    const classes_dict = listClassesAnnotate2State(classes_annotate);

    this.setState({ ...classes_dict });
    let initial_state = {
      // cat 1
      ...classes_dict,
      ...props_state
    };
    this.setState({ ...initial_state });
  }
  handleChangeTab(ev, focus_tab) {
    console.warn(ev);
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
    const { feature, updateFeature, setup_data } = this.props;
    const { fieldProperties } = setup_data;

    this.setState({
      [e.target.name]: e.target.checked
    });
    // update props feature
    let newFature = getPropFeature(feature, fieldProperties);

    // category
    const old_value = !!newFature[e.target.name];

    newFature[e.target.name] = !old_value;
    newFature.uuid_difference = uuidv4();

    [('pointScale', 'sizeImage')].forEach((i) => {
      if (newFature[i]) {
        delete newFature[i];
      }
    });
    if (fieldProperties && fieldProperties !== '') {
      updateFeature({ ...feature, [fieldProperties]: { ...newFature } });
    } else {
      updateFeature(newFature);
    }
  }

  convertSecondaryText(text) {
    if (['', null, undefined].includes(text)) return '';
    if (`${typeof text}` === 'object') return JSON.stringify(text);
    return `${text}`;
  }

  renderCheckboxs() {
    const { classes, classes_annotate_dict } = this.props;

    return (
      <div className={classes.canvasContainer}>
        <FormControl size="small">
          {Object.keys(classes_annotate_dict).map((i) => (
            <div key={i}>
              <label className={classes.label}>{i.replaceAll('_', ' ').replaceAll('-', ' ')}</label>
              <FormGroup>
                {classes_annotate_dict[i].map((j) => (
                  <FormControlLabel
                    key={`${PREFIX_FIELD}__${i}__${j}`}
                    control={
                      <CustomCheckBox
                        checked={this.state[`${PREFIX_FIELD}__${i}__${j}`] || false}
                        onChange={this.handleChangeCheck}
                        name={`${PREFIX_FIELD}__${i}__${j}`}
                      />
                    }
                    label={j.replaceAll('_', ' ').replaceAll('-', ' ')}
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
      </React.Fragment>
    );
  }

  render() {
    const { classes, total, index, feature } = this.props;
    return (
      <div className={classes.container}>
        <Loadfile />
        {feature ? (
          <React.Fragment>
            <div className={classes.paddinBox}>
              <TextField
                id="index"
                label="Index"
                onChange={this.handleChange}
                value={index}
                type="number"
              />
            </div>
            <Divider />
          </React.Fragment>
        ) : null}
        {this.renderTabs()}
        {total !== 0 ? (
          <React.Fragment>
            <Divider />
            <List component="div" className={classes.listfeatures}>
              <ListItem className={classes.lItem}>
                <ListItemText primary="Total" />
                <ListItemSecondaryAction>
                  <Typography variant="body1" component="span" color="textSecondary">
                    {total}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.data.totalFeatures,
  index: state.data.index,
  feature: state.data.feature,
  data: state.data.data,
  setup_tool: state.annotationSeed.setup_tool,
  setup_data: state.annotationSeed.setup_data,
  classes_annotate_dict: state.annotationSeed.classes_annotate_dict,
  classes_annotate: state.annotationSeed.classes_annotate
});
const mapDispatchToProps = {
  updateFeature,
  updateIndex
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SidePanel);
