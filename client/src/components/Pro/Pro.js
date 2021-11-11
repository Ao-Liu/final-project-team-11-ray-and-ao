import React, { useState } from 'react';
import { Toolbar, Typography, Container, Grow, Grid, AppBar, TextField, Button, Paper} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import userAvatar from '../../images/user.png';

import { getPostsBySearch } from '../../actions/posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Profile = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Grid container direction="row" spacing={8} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={6} justifyContent="center" alignItems="center">
          <Paper style={{ padding: '72px', borderRadius: '15px', backgroundColor:'#FEF7CE', height: '70vh'}} elevation={0}>
            <Typography style={{ fontWeight: 600,  fontSize: "96px",textAlign:'center'}} variant="h2" component="h2">Free</Typography>
            <Grid container >
              <Grid item md={2}/>
              <Grid item >
                <Typography style={{ fontWeight: 600, fontSize: "160px", textAlign:'center', marginTop: '30px'}} variant="h1" component="h4">0$</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 500, textAlign:'center', marginTop: '60px'}} variant="h1" component="h4">/month</Typography>
              </Grid>
              <Grid item md={5}/>
            </Grid>
            <Grid container >
              <Grid item md={12}>
                <Typography style={{ fontWeight: 400, textAlign:'left', marginLeft:"140px", marginTop: '30px'}} variant="h5" component="h4">Sign up for official contests</Typography>
              </Grid>
              <Grid item md={12}>
                <Typography style={{ fontWeight: 400, textAlign:'left', marginLeft:"140px", marginTop: '30px'}} variant="h5" component="h4">Claim Prizes</Typography>
              </Grid>
              <Grid item md={12}>
                <Typography style={{ fontWeight: 400, textAlign:'left', marginLeft:"140px", marginTop: '30px'}} variant="h5" component="h4">View hundred thousands of recipes</Typography>
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" disableElevation style={{ marginTop: '60px', left: "32%",fontSize:"40px", height: '3em', width:"7em",backgroundColor: '#173A56' }}>Subscribed</Button>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper style={{ padding: '72px', borderRadius: '15px', backgroundColor:'#E7FFD4', height: '70vh'}} elevation={0}>
          <Typography style={{ fontWeight: 600,  fontSize: "96px",textAlign:'center'}} variant="h2" component="h2">Pro</Typography>
            <Grid container >
              <Grid item md={2}/>
              <Grid item >
                <Typography style={{ fontWeight: 600, fontSize: "160px", textAlign:'center', marginTop: '30px'}} variant="h1" component="h4">5$</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 500, textAlign:'center', marginTop: '60px'}} variant="h1" component="h4">/month</Typography>
              </Grid>
              <Grid item md={5}/>
            </Grid>
            <Grid container >
              <Grid item md={12}>
                <Typography style={{ fontWeight: 400, textAlign:'left', marginLeft:"140px", marginTop: '30px'}} variant="h5" component="h4">Make your personal contests</Typography>
              </Grid>
              <Grid item md={12}>
                <Typography style={{ fontWeight: 400, textAlign:'left', marginLeft:"140px", marginTop: '30px'}} variant="h5" component="h4">Customized rules</Typography>
              </Grid>
              <Grid item md={12}>
                <Typography style={{ fontWeight: 400, textAlign:'left', marginLeft:"140px", marginTop: '30px'}} variant="h5" component="h4">Help us improve!</Typography>
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" disableElevation style={{ marginTop: '60px', left: "32%",fontSize:"40px", height: '3em', width:"7em",backgroundColor: '#74B666' }}>Upgrade</Button>
          </Paper>
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Profile;
