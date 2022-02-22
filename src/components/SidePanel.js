import {
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { updateIndex, updateFeature } from '../actions/dataActions';
import { headerHeigth } from '../style/HomeStyles';
import { makeChartData } from '../utils/utils';
import Loadfile from './Loadfile';
import { v4 as uuidv4 } from 'uuid';

const COLORS = ['#00A650', '#E92D44', '#FFCD40', '#6c757d'];

const RADIAN = Math.PI / 180;
const CHECKBOXHEIGHT = 750;
const IMAGE_SCALE = 100;

const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, value, name } = props;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (!value) return null;
  return (
    <text
      x={x}
      y={y}
      fill={name === 'unrecognized' ? '#000000de' : 'white'}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
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
    minHeight: CHECKBOXHEIGHT + 32,
    padding: 0
  },
  chartContainer: {
    height: CHECKBOXHEIGHT,
    padding: 0
  },
  lItem: {
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    wordWrap: 'break-word'
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
    padding: 8,
    height: CHECKBOXHEIGHT
  },
  image: {
    maxHeight: CHECKBOXHEIGHT
  },
  tableSmall: {
    overflow: 'hidden',
    height: CHECKBOXHEIGHT,
    position: 'relative',
    width: 'auto',
    pointerEvents: 'none'
  },
  tableBig: {
    height: (CHECKBOXHEIGHT - IMAGE_SCALE) * 3,
    width: (CHECKBOXHEIGHT - IMAGE_SCALE) * 3,
    display: 'grid',
    gridTemplateColumns: `repeat(3, ${CHECKBOXHEIGHT - IMAGE_SCALE}px)`,
    gridTemplateRows: `repeat(3, ${CHECKBOXHEIGHT - IMAGE_SCALE}px)`,
    gridColumnGap: 0,
    gridRowGap: 0,
    overflow: 'hidden',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none'
  },
  div1: { gridArea: '1 / 1 / 2 / 2', border: '1px solid red', pointerEvents: 'none' },
  div2: { gridArea: '1 / 2 / 2 / 3', border: '1px solid red', pointerEvents: 'none' },
  div3: { gridArea: '1 / 3 / 2 / 4', border: '1px solid red', pointerEvents: 'none' },
  div4: { gridArea: '2 / 1 / 3 / 2', border: '1px solid red', pointerEvents: 'none' },
  div5: { gridArea: '2 / 2 / 3 / 3', border: '1px solid red', pointerEvents: 'none' },
  div6: { gridArea: '2 / 3 / 3 / 4', border: '1px solid red', pointerEvents: 'none' },
  div7: { gridArea: '3 / 1 / 4 / 2', border: '1px solid red', pointerEvents: 'none' },
  div8: { gridArea: '3 / 2 / 4 / 3', border: '1px solid red', pointerEvents: 'none' },
  div9: { gridArea: '3 / 3 / 4 / 4', border: '1px solid red', pointerEvents: 'none' }
});

class SidePanel extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      focus_tab: 0,
      // states
      // cat 1
      prop_feature__vacant_lots__paved: false,
      prop_feature__vacant_lots__unpaved: false,
      prop_feature__vacant_lots__overgrown: false,
      prop_feature__vacant_lots__fenced: false,
      prop_feature__vacant_lots__side_fences_only: false,
      prop_feature__vacant_lots__construction_activity: false,
      prop_feature__vacant_lots__litter_dumping_tires: false,
      // cat 2
      prop_feature__structures__damaged_roof: false,
      prop_feature__structures__broken_windows_doors: false,
      prop_feature__structures__missing_windows_doors: false,
      prop_feature__structures__boarded_up_windows_doors: false,
      prop_feature__structures__overgrown_lawn: false,
      prop_feature__structures__overgrown_shrubbery_trees: false,
      prop_feature__structures__structural_issues: false,
      prop_feature__structures__faded_paint: false,
      prop_feature__structures__litter_in_around_structure: false,
      prop_feature__structures__abandoned_vehicle: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { feature } = nextProps;
    if (feature && feature.properties) {
      const props_state = Object.keys(feature.properties || {})
        .sort()
        .filter((i) => i.includes('prop_feature'))
        .reduce((a, v) => ({ ...a, [v]: feature.properties[v] }), {});
      let initial_state = {
        // cat 1
        prop_feature__vacant_lots__paved: false,
        prop_feature__vacant_lots__unpaved: false,
        prop_feature__vacant_lots__overgrown: false,
        prop_feature__vacant_lots__fenced: false,
        prop_feature__vacant_lots__side_fences_only: false,
        prop_feature__vacant_lots__construction_activity: false,
        prop_feature__vacant_lots__litter_dumping_tires: false,
        // cat 2
        prop_feature__structures__damaged_roof: false,
        prop_feature__structures__broken_windows_doors: false,
        prop_feature__structures__missing_windows_doors: false,
        prop_feature__structures__boarded_up_windows_doors: false,
        prop_feature__structures__overgrown_lawn: false,
        prop_feature__structures__overgrown_shrubbery_trees: false,
        prop_feature__structures__structural_issues: false,
        prop_feature__structures__faded_paint: false,
        prop_feature__structures__litter_in_around_structure: false,
        prop_feature__structures__abandoned_vehicle: false,
        ...props_state
      };
      this.setState({ ...initial_state });
    }
  }
  handleChangeTab(ev, focus_tab) {
    this.setState({ focus_tab });
  }

  handleChange(e) {
    const { total } = this.props;
    const re = /[0-9]+/g;
    let value = e.target.value;
    if (value === '' || re.test(value)) {
      value = parseInt(value);
      if (total >= value && value >= 0) {
        this.props.dispatch(updateIndex(value));
      }
      return;
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
      .filter((i) => i.includes('prop_feature'))
      .map((i) => ({ key: `${i}`, value: feature.properties[i] }));
    return (
      <>
        {properties.map((l, k) => (
          <ListItem key={`li-${uuid_difference}-${k}`} className={classes.lItem}>
            <ListItemText
              classes={l.key.includes('__') ? { secondary: classes.secondaryText } : null}
              primary={`${l.key}`.replace('prop_feature__', '')}
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
    const { classes } = this.props;
    const {
      prop_feature__vacant_lots__paved,
      prop_feature__vacant_lots__unpaved,
      prop_feature__vacant_lots__overgrown,
      prop_feature__vacant_lots__fenced,
      prop_feature__vacant_lots__side_fences_only,
      prop_feature__vacant_lots__construction_activity,
      prop_feature__vacant_lots__litter_dumping_tires,
      prop_feature__structures__damaged_roof,
      prop_feature__structures__broken_windows_doors,
      prop_feature__structures__missing_windows_doors,
      prop_feature__structures__boarded_up_windows_doors,
      prop_feature__structures__overgrown_lawn,
      prop_feature__structures__overgrown_shrubbery_trees,
      prop_feature__structures__structural_issues,
      prop_feature__structures__faded_paint,
      prop_feature__structures__litter_in_around_structure,
      prop_feature__structures__abandoned_vehicle
    } = this.state;

    return (
      <div className={classes.canvasContainer}>
        <FormControl size="small">
          <label>Vacant lots</label>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__vacant_lots__paved}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__vacant_lots__paved"
                />
              }
              label="Paved"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__vacant_lots__unpaved}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__vacant_lots__unpaved"
                />
              }
              label="Unpaved"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__vacant_lots__overgrown}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__vacant_lots__overgrown"
                />
              }
              label="Overgrown"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__vacant_lots__fenced}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__vacant_lots__fenced"
                />
              }
              label="Fenced"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__vacant_lots__side_fences_only}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__vacant_lots__side_fences_only"
                />
              }
              label="Side Fences only"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__vacant_lots__construction_activity}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__vacant_lots__construction_activity"
                />
              }
              label="Construction activity"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__vacant_lots__litter_dumping_tires}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__vacant_lots__litter_dumping_tires"
                />
              }
              label="Litter/dumping/Tires"
            />
          </FormGroup>
          <label>Structures</label>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__damaged_roof}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__damaged_roof"
                />
              }
              label="Damaged roof"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__broken_windows_doors}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__broken_windows_doors"
                />
              }
              label="Broken windows / doors"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__missing_windows_doors}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__missing_windows_doors"
                />
              }
              label="Missing windows / doors"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__boarded_up_windows_doors}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__boarded_up_windows_doors"
                />
              }
              label="Boarded up windows / doors"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__overgrown_lawn}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__overgrown_lawn"
                />
              }
              label="Overgrown lawn "
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__overgrown_shrubbery_trees}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__overgrown_shrubbery_trees"
                />
              }
              label="Overgrown shrubbery/trees"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__structural_issues}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__structural_issues"
                />
              }
              label="Structural issues"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__faded_paint}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__faded_paint"
                />
              }
              label="Faded paint"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__litter_in_around_structure}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__litter_in_around_structure"
                />
              }
              label="Litter in / around structure"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={prop_feature__structures__abandoned_vehicle}
                  onChange={this.handleChangeCheck}
                  name="prop_feature__structures__abandoned_vehicle"
                />
              }
              label="Abandoned vehicle"
            />
          </FormGroup>
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
        {!feature ? <Loadfile /> : null}
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
  data: state.geojsonData.data
});
const mapDispatchToProps = {
  updateFeature
};
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SidePanel);
