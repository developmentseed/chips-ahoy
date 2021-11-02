import {
  AppBar,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { compose } from 'recompose';

import { updateIndex } from '../actions/dataActions';
import { headerHeigth } from '../style/HomeStyles';
import { makeChartData } from '../utils/utils';
import Loadfile from './Loadfile';
import TabPanel from './TabPanel';

const COLORS = ['#00A650', '#E92D44', '#FFCD40', '#6c757d'];

const RADIAN = Math.PI / 180;
const IMAGEHEIGHT = 250;
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
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  listfeatures: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: `calc(100vh - 64px - 32px - 70px - ${IMAGEHEIGHT}px - ${headerHeigth * 1.7}px)`,
    overflow: 'auto',
    width: '100%',
    padding: theme.spacing(2),
    paddingRight: 0
  },
  tabContainer: {
    height: 320,
    padding: 0
  },
  chartContainer: {
    height: IMAGEHEIGHT,
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
    textAlign: 'center',
    padding: 8,
    height: IMAGEHEIGHT
  },
  image: {
    maxHeight: IMAGEHEIGHT
  },
  tableSmall: {
    overflow: 'hidden',
    height: IMAGEHEIGHT,
    position: 'relative',
    width: 'auto',
    pointerEvents: 'none'
  },
  tableBig: {
    height: (IMAGEHEIGHT - IMAGE_SCALE) * 3,
    width: (IMAGEHEIGHT - IMAGE_SCALE) * 3,
    display: 'grid',
    gridTemplateColumns: `repeat(3, ${IMAGEHEIGHT - IMAGE_SCALE}px)`,
    gridTemplateRows: `repeat(3, ${IMAGEHEIGHT - IMAGE_SCALE}px)`,
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
      focus_tab: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
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
  convertSecondaryText(text) {
    if (!text) return '';
    if (`${typeof text}` === 'object') return JSON.stringify(text);
    return `${text}`;
  }

  renderProperties() {
    const { classes, feature } = this.props;
    if (!feature || !feature.properties) return null;
    const properties = Object.keys(feature.properties || {})
      .sort()
      .filter((i) => !['__reviewed', 'tiles_neighbors'].includes(i))
      .map((i) => ({ key: `${i}`, value: feature.properties[i] }));
    return (
      <>
        {properties.map((l, k) => (
          <ListItem key={`li-${k}`} className={classes.lItem}>
            <ListItemText
              classes={
                l.key === 'dc_has_pattern_school' ? { secondary: classes.secondaryText } : null
              }
              primary={`${l.key}`}
              secondary={this.convertSecondaryText(l.value)}
            />
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

  renderChart() {
    const { data, classes } = this.props;
    const dataChart = makeChartData(data);

    if (!dataChart) return null;

    return (
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart height={IMAGEHEIGHT}>
            <Pie
              data={dataChart}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value">
              {dataChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
  renderContextImage() {
    const { classes, feature } = this.props;

    return (
      <div className={classes.canvasContainer}>
        <div className={classes.tableSmall}>
          {feature && feature.properties && feature.properties.tiles_neighbors ? (
            <div className={classes.tableBig}>
              <div className={classes.div1}>
                <img
                  alt="tn_0"
                  src={feature.properties.tiles_neighbors.tn_0}
                  height={IMAGEHEIGHT - IMAGE_SCALE}
                  width={IMAGEHEIGHT - IMAGE_SCALE}
                />
              </div>
              <div className={classes.div2}>
                <img
                  alt="tn_3"
                  src={feature.properties.tiles_neighbors.tn_3}
                  height={IMAGEHEIGHT - IMAGE_SCALE}
                  width={IMAGEHEIGHT - IMAGE_SCALE}
                />
              </div>
              <div className={classes.div3}>
                <img
                  alt="tn_5"
                  src={feature.properties.tiles_neighbors.tn_5}
                  height={IMAGEHEIGHT - IMAGE_SCALE}
                  width={IMAGEHEIGHT - IMAGE_SCALE}
                />
              </div>
              <div className={classes.div4}>
                <img
                  alt="tn_1"
                  src={feature.properties.tiles_neighbors.tn_1}
                  height={IMAGEHEIGHT - IMAGE_SCALE}
                  width={IMAGEHEIGHT - IMAGE_SCALE}
                />
              </div>
              <div className={classes.div5}>
                <img
                  alt="url"
                  src={feature.properties.url}
                  height={IMAGEHEIGHT - IMAGE_SCALE}
                  width={IMAGEHEIGHT - IMAGE_SCALE}
                />
              </div>
              <div className={classes.div6}>
                <img
                  alt="tn_6"
                  src={feature.properties.tiles_neighbors.tn_6}
                  height={IMAGEHEIGHT - IMAGE_SCALE}
                  width={IMAGEHEIGHT - IMAGE_SCALE}
                />
              </div>
              <div className={classes.div7}>
                <img
                  alt="tn_2"
                  src={feature.properties.tiles_neighbors.tn_2}
                  height={IMAGEHEIGHT - IMAGE_SCALE}
                  width={IMAGEHEIGHT - IMAGE_SCALE}
                />
              </div>
              <div className={classes.div8}>
                <img
                  alt="tn_4"
                  src={feature.properties.tiles_neighbors.tn_4}
                  height={IMAGEHEIGHT - IMAGE_SCALE}
                  width={IMAGEHEIGHT - IMAGE_SCALE}
                />
              </div>
              <div className={classes.div9}>
                <img
                  alt="tn_7"
                  src={feature.properties.tiles_neighbors.tn_7}
                  height={IMAGEHEIGHT - IMAGE_SCALE}
                  width={IMAGEHEIGHT - IMAGE_SCALE}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  renderTabs() {
    let { focus_tab } = this.state;
    const { classes, feature, total } = this.props;
    if (!feature || total === 0) return null;
    const has_supertile = feature && feature.properties && feature.properties.url_supertile;

    return (
      <div className={classes.tabContainer}>
        <Divider />
        <AppBar position="static">
          <Tabs
            value={focus_tab}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
            onChange={this.handleChangeTab}>
            <Tab label="Chart" />
            <Tab label="Map" disabled={!has_supertile} />
          </Tabs>
        </AppBar>
        <TabPanel value={focus_tab} index={0}>
          {this.renderChart()}
        </TabPanel>
        <TabPanel value={focus_tab} index={1}>
          {this.renderContextImage()}
        </TabPanel>
      </div>
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
          </div>
        ) : null}
        <List component="nav" className={classes.listfeatures}>
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
        {this.renderTabs()}
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

export default compose(connect(mapStateToProps), withStyles(styles))(SidePanel);
