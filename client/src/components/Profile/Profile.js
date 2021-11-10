import React, { useState } from 'react';
import { Toolbar, Typography, Container, Grow, Grid, AppBar, TextField, Button, Paper, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import userAvatar from '../../images/user.png';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
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

  const [attended, setAttended] = useState(80);
  const [ranking, setRanking] = useState(10565);
  const [possession, setPossession] = useState(5000);

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
      <Grid container direction="row" spacing={4} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={5} justifyContent="center" alignItems="center">
          <Paper style={{ padding: '72px', borderRadius: '15px', backgroundColor:'#FEF7CE', height: '70vh'}} elevation={0}>
            <Avatar alt="Avatar" src={userAvatar} style={{left:"22%", height: "15em", width: "15em"}}/>
            <Typography style={{ fontWeight: 600, textAlign:'center', marginTop: '50px'}} variant="h3" component="h2">Ray Fang</Typography>
            <Typography style={{ fontWeight: 400, textAlign:'center', marginTop: '30px'}} variant="h5" component="h4">fangrui200614@gmail.com</Typography>
            <Typography style={{ fontWeight: 400, textAlign:'center', marginTop: '50px'}} variant="h5" component="h3">Hello Guys! I'm from Shanghai China and I really enjoy cooking. Hope to make friends with you all!</Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={7}>
          <Grid container direction="column" spacing={2} justifyContent="center">
            <Grid item>
              <Paper style={{ padding: '50px', borderRadius: '15px', backgroundColor:'#EFEEFE', height: '18vh'}} elevation={0}>
                <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h4" component="h2">My Recipe Run</Typography>
                <Grid container justifyContent="space-evenly" alignItems="center">
                  <Grid item sm={6} md={4}>
                    <Typography style={{ fontWeight: 600, marginLeft: '10px' , marginTop: '60px'}} variant="h5" component="h4">Attended: {attended}</Typography>
                  </Grid>
                  <Grid item sm={6} md={4}>
                    <Typography style={{ fontWeight: 600, marginLeft: '10px' , marginTop: '60px'}} variant="h5" component="h4">Possession: {possession}</Typography>
                  </Grid>
                  <Grid item sm={6} md={4}>
                    <Typography style={{ fontWeight: 600, marginLeft: '10px' , marginTop: '60px'}} variant="h5" component="h4">Ranking: {ranking}</Typography>
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
