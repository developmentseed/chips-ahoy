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
  imageContainer: {
    textAlign: 'center',
    padding: 10,
    height: IMAGEHEIGHT
  },
  image: {
    maxHeight: IMAGEHEIGHT
  }
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
    const { feature } = this.props;
    console.warn(feature, focus_tab);
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
      .filter((i) => !['__reviewed'].includes(i))
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
      <div className={classes.imageContainer}>
        {feature && feature.properties && feature.properties.url_supertile ? (
          <img src={feature.properties.url_supertile} alt="img" className={classes.image} />
        ) : null}
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
