import { headerHeigth } from '../../utils/constants';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    marginTop: headerHeigth,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  overflowNone: {
    overflow: 'unset',
    padding: 0
  },
  fixedHeight: {
    height: `calc(100vh - ${headerHeigth * 1.7}px)`,
    overflowY: 'auto'
  },
  paperImage: {
    padding: 4
  },
  image: {
    borderRadius: 8
  },
  containerImages: {
    height: `calc(100vh - ${headerHeigth * 1.7}px)`,
    overflowY: 'auto',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  imageunavailable: {
    width: '100%',
    height: ' 100%',
    objectFit: 'contain'
  }
});

export default styles;
