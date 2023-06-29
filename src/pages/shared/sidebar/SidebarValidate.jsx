import {
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

import { setFilter } from '../../../actions/dataActions';
import { PREFIX_FIELD } from '../../../utils/constants';
import { filterProps } from '../../../utils/utils';
import CustomCheckBox from './CustomCheckBox.jsx';
import styles from './styles';

class SidebarValidatePanel extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      focus_tab: 0
      // states
    };
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
  }
  componentDidMount() {
    const { classes_annotate, history, setFilter } = this.props;
    // create states
    let classes_dict = classes_annotate.reduce((acc, elem) => {
      acc[elem] = false;
      return acc;
    }, {});
    // from url
    const parsed = queryString.parse(history.location.search, { parseBooleans: true });
    if (parsed) {
      classes_dict = { ...classes_dict, ...parsed };
      setFilter({ ...parsed });
    }

    this.setState({ ...classes_dict });
  }

  handleChangeCheck(e) {
    const { history, setFilter } = this.props;

    let parsed = queryString.parse(history.location.search, { parseBooleans: true });
    parsed[e.target.name] = e.target.checked;
    const newParsed = filterProps(parsed);

    // update state and props
    this.setState({
      [e.target.name]: e.target.checked
    });
    setFilter({ ...newParsed });
    const stringified = queryString.stringify({ ...newParsed });
    history.replace({ search: stringified });
  }

  renderCheckboxs() {
    const { classes, classes_annotate_dict } = this.props;
    if (!classes_annotate_dict) return null;

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
    const { classes, classes_annotate } = this.props;
    if (!classes_annotate) return null;
    return (
      <React.Fragment>
        <div className={classes.tabContainer}>{this.renderCheckboxs()}</div>
      </React.Fragment>
    );
  }
  renderTotal() {
    const { classes, total } = this.props;

    return (
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
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.paddinBox}>
          <Typography variant="body1" component="span">
            Filter props
          </Typography>{' '}
          <Divider />
        </div>
        {this.renderTabs()}
        {this.renderTotal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data.data,
  classes_annotate_dict: state.annotationSeed.classes_annotate_dict,
  classes_annotate: state.annotationSeed.classes_annotate
});
const mapDispatchToProps = {
  setFilter
};

export default withRouter(
  compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SidebarValidatePanel)
);
