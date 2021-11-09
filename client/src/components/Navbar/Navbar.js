import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import recipeRun from '../../images/recipeRun.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  const navProfile = () => {
    
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} elevation={0} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={recipeRun} alt="icon" height="45px" />
        {/* <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" /> */}
      </Link>
      <Toolbar className={classes.btnGrp}>
        <Button size="large" variant="text" component={Link} to="/" className={classes.touchBarBtn} color="primary" style={{ backgroundColor: 'transparent' }} >Home</Button>
        <Button variant="text" size="large" className={classes.touchBarBtn} color="primary" onClick={navProfile} style={{ backgroundColor: 'transparent' }} >Profile</Button>
        <Button variant="text" size="large" className={classes.touchBarBtn} color="primary" onClick={navProfile} style={{ backgroundColor: 'transparent' }}  >Pro</Button> 
      </Toolbar>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
            <Button className={classes.login} component={Link} to="/auth" variant="contained" disableElevation style={{ backgroundColor: '#203954' }}>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
