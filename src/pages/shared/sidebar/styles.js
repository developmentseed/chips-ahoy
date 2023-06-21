import { headerHeigth, CHECKBOXHEIGHT } from '../../../utils/constants';

const styles = (theme) => ({
  containerLoad: {
    height: 100,
    padding: theme.spacing(2)
  },
  paperFetch: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
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
    minHeight: CHECKBOXHEIGHT + 5,
    padding: 0
  },
  chartContainer: {
    height: CHECKBOXHEIGHT,
    padding: 0
  },
  lItem: {
    paddingBottom: 2,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 2,

    wordWrap: 'break-word'
  },
  lItemText: {
    marginBottom: 2,
    marginTop: 2
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
    padding: 8
    // height: CHECKBOXHEIGHT
  },
  image: {
    maxHeight: CHECKBOXHEIGHT
  },
  label: {
    fontSize: '1.01rem',
    fontWeight: 600
  }
});

export default styles;
