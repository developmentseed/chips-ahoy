import {
  Divider,
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
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { compose } from 'recompose';

import { updateIndex } from '../actions/dataActions';
import { headerHeigth } from '../style/HomeStyles';
import { makeChartData } from '../utils/utils';
import Loadfile from './Loadfile';

const COLORS = ['#28a745', '#dc3545', '#17a2b8', '#6c757d'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  listfeatures: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: `calc(100vh - 64px - 32px - 230px - ${headerHeigth * 1.7}px)`,
    overflow: 'auto',
    width: '100%',
    padding: 0
  },
  chartContainer: {
    height: 230
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
  }
});

class SidePanel extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { classes, total, index, feature, data } = this.props;
    const dataChart = makeChartData(data);

    return (
      <div className={classes.container}>
        {!feature ? <Loadfile /> : null}
        {feature ? (
          <List component="nav">
            <ListItem>
              <TextField
                id="index"
                label="Index"
                onChange={this.handleChange}
                value={index}
                type="number"
              />
            </ListItem>
            <Divider />
          </List>
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
        <Divider />
        {feature && dataChart ? (
          <div className={classes.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
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
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : null}
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
