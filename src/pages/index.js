import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { compose } from 'recompose';

import { tokeUrl } from '../actions/dsAnnotate';
import styles from '../style/general';
import AnnotatePage from './AnnotatePage.jsx';
import BlankPage from './BlankPage.jsx';
import HeaderAnnotate from './shared/header/HeaderAnnotate.jsx';
import ValidatePage from './ValidatePage';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { token_url, tokeUrl } = this.props;
    tokeUrl(token_url);
  }
  render() {
    const { classes, has_access } = this.props;

    return (
      <div className={classes.root}>
        <HeaderAnnotate />
        {has_access ? (
          <Switch>
            <Route exact path="/" component={AnnotatePage} />
            <Route exact path="/validate" component={ValidatePage} />
            <Route path="*" component={BlankPage} />
          </Switch>
        ) : (
          <Switch>
            <Route path="*" component={BlankPage} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  has_access: state.dsAnnotate.has_access
});
const mapDispatchToProps = {
  tokeUrl
};
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Home);
