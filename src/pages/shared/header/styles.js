import { headerHeigth, drawerWidth } from "../../../utils/constants";

const styles = (theme) => ({
  flex: {
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
  justifyCo: {
    justifyContent: 'flex-start'
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  nameFile: {
    marginLeft: '1.5rem',
    marginRight: '1.5rem'
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
  progressbarContainer: {
    position: 'relative',
    marginLeft: 0,
    width: `calc(100vw - ${drawerWidth * 3}px)`
  }
});

export default styles;
