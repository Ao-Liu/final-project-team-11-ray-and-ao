import React from 'react';
import { Typography, Grow, Grid, Button, Paper, Avatar} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation , Link } from 'react-router-dom';
import possessionImg from '../../images/possession.png'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  let userId = 0;
  if (user?.result?.googleId) {
    userId = user?.result?.googleId
  } else if (user?.result?._id) {
    userId = user?.result?._id
  }
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Grow in>
      <Grid container direction="row" spacing={4} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={5}>
          <Paper style={{ padding: '72px', borderRadius: '15px', backgroundColor:'#FEF7CE', height: '70vh'}} elevation={0}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item>
                <Avatar alt="Avatar" src={user?.result?.imgurl} style={{height: "15em", width: "15em"}}/>
              </Grid>
            </Grid>
            <Typography style={{ fontWeight: 600, textAlign:'center', marginTop: '50px'}} variant="h3" component="h2">{user?.result?.name}</Typography>
            <Typography style={{ fontWeight: 400, textAlign:'center', marginTop: '30px'}} variant="h5" component="h4">{user?.result?.email}</Typography>
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
                {userId ? <Button component={Link} 
                                to={`/submissions?user=${userId}`} 
                                variant="contained" size="large" 
                                color="primary" 
                                disableElevation 
                                style={{ fontSize:"26px", backgroundColor: '#82B36F', height: '2.5em', width:"5.5em", color: '#FFF', marginLeft:'30px', marginTop: '30px' }}
                                >View</Button> : 
                          <Typography style={{ fontWeight: 600, marginTop: '6px'}} variant="h5" component="h4">Feature Not Available</Typography>}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Profile;
