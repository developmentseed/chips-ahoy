const drawerWidth = 240;
export const headerHeigth = 55;

const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexGrow: 1,
    background: 'rgb(250, 250, 250)'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolbar: {
    minHeight: 56,
    [theme.breakpoints.up('sm')]: {
      minHeight: headerHeigth
    },
    background: '#ffc107',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(1)
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
  button: {
    color: '#fff !important',
    textTransform: 'uppercase',
    textDecoration: 'none',
    background: '#ed3330',
    border: 'none',
    textAlign: 'center',
    width: '180px'
  },
  nameFile: {
    marginLeft: '1.5rem',
    marginRight: '1.5rem'
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
  progressbarContainer: {
    position: 'relative',
    marginLeft: 0,
    width: `calc(100vw - ${drawerWidth * 3}px)`
  },
  justifyCo: {
    justifyContent: 'flex-start'
  },
  overflowNone: {
    overflow: 'unset',
    padding: 0
  },
  imageunavailable: {
    width: '100%',
    height:' 100%',
    objectFit: 'contain',
  }
});

export default styles;
