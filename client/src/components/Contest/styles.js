import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  fileInput: {
    width: '97%',
    margin: '15px 0',
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '300px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
  },
  login: {
    marginLeft: '20px',
    background: '#203954',
    color: '#FFF'
  },
  btnGrp: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '600px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  touchBarBtn: {
    marginLeft: '60px',
    fontSize: '18px',
    color: '#203954'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#203954'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  timer: {
    fontWeight: 600, 
    textAlign:'center', 
  }
}));
