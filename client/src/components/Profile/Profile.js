import React, { useState } from 'react';
import { Toolbar, Typography, Container, Grow, Grid, AppBar, TextField, Button, Paper, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import userAvatar from '../../images/user.png';
import possessionImg from '../../images/possession.png'
import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);

  const history = useHistory();

  return (
    <Grow in>
      <Grid container direction="row" spacing={4} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={5} justifyContent="center" alignItems="center">
          <Paper style={{ padding: '72px', borderRadius: '15px', backgroundColor:'#FEF7CE', height: '70vh'}} elevation={0}>
            <Avatar alt="Avatar" src={userAvatar} style={{left:"22%", height: "15em", width: "15em"}}/>
            <Typography style={{ fontWeight: 600, textAlign:'center', marginTop: '50px'}} variant="h3" component="h2">{user?.result?.name}</Typography>
            <Typography style={{ fontWeight: 400, textAlign:'center', marginTop: '30px'}} variant="h5" component="h4">{user?.result?.email}</Typography>
            <Typography style={{ fontWeight: 400, textAlign:'center', marginTop: '50px'}} variant="h5" component="h3">{user?.result?.description}</Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={7}>
          <Grid container direction="column" spacing={2} justifyContent="center">
            <Grid item>
              <Paper style={{ padding: '50px', borderRadius: '15px', backgroundColor:'#EFEEFE', height: '18vh'}} elevation={0}>
                <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h4" component="h2">My Recipe Run</Typography>
                <Grid container justifyContent="space-evenly" alignItems="center">
                  <Grid item sm={6} md={3}>
                    <Typography style={{ fontWeight: 600, marginLeft: '10px' , marginTop: '60px'}} variant="h5" component="h4">Attended: {user?.result?.attended}</Typography>
                  </Grid>
                  <Grid item sm={6} md={1}>
                    <img alt="possession" src={possessionImg} style={{height: "5vh", marginLeft: '30px' , marginTop: '60px'}}/>
                  </Grid>
                  <Grid item sm={6} md={4}>
                    <Typography style={{ fontWeight: 600, marginTop: '60px'}} variant="h5" component="h4">Possession: {user?.result?.possession}</Typography>
                  </Grid>
                  <Grid item sm={6} md={4}>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{padding: '50px', borderRadius: '15px', backgroundColor:'#FAE4EC', height: '45vh'}} elevation={0}>
              <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h4" component="h2">My Submissions</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Profile;