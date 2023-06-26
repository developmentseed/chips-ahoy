import { headerHeigth, drawerWidth } from "../utils/constants";

const styles = (theme) => ({
  root: {
    display: 'flex'
  },

  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.main,
    minHeight: `${headerHeigth}px !important`,
    height: `${headerHeigth}px !important`
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    marginTop: headerHeigth,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: `calc(100vh - ${headerHeigth * 1.7}px)`
  },

  overflowNone: {
    overflow: 'unset',
    padding: 0
  },
  imageunavailable: {
    width: '100%',
    height: ' 100%',
    objectFit: 'contain'
  }
});

export default styles;
