import 'react-notifications/lib/notifications.css';

import { Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import styles from './../style/HomeStyles';
import unavailable from '../assets/unavailable.jpg';
class BlankPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <main className={classes.content}>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper className={fixedHeightPaper} elevation={3}>
                <img className={classes.imageunavailable} src={unavailable} alt="img" />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(BlankPage);
