import React, { useState } from 'react';
import { Toolbar, Typography, Container, Grow, Grid, AppBar, TextField, Button, Paper, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import userAvatar from '../../images/user.png';
import Recipe from './Recipe.js';
import possession from '../../images/possession.png'
import cash from '../../images/cash.png'

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Contest = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [prize1, setPrize1] = useState("$10");
  const [prize2, setPrize2] = useState("$5");
  const [prize3, setPrize3] = useState("$3");
  const [prize4, setPrize4] = useState("$2");
  const [prize5, setPrize5] = useState("$2");
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
      <Grid container direction="row" spacing={4} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={3} justifyContent="center" alignItems="center">
            <Grid container direction="column" spacing={4} justifyContent="center">
                <Grid item>
                    <Paper style={{ padding: '72px', borderRadius: '15px', backgroundColor:'#FEF7CE', height: '36vh'}} elevation={0}>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={8}>
                                <Typography style={{ fontWeight: 600}} variant="h3" component="h2">Prize</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4}>
                                {prize1.includes('$') ? <img alt="cash" src={cash} style={{height: "5vh"}}/>:
                                                        <img alt="possession" src={possession} style={{height: "5vh"}}/>}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={8}>
                                <Typography style={{ fontWeight: 600, marginTop: '40px'}} variant="h5" component="h4">1st</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4}>
                                <Typography style={{ fontWeight: 400, marginTop: '40px'}} variant="h5" component="h4">{prize1}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={8}>
                                <Typography style={{ fontWeight: 600, marginTop: '10px'}} variant="h5" component="h4">2nd</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4}>
                                <Typography style={{ fontWeight: 400, marginTop: '10px'}} variant="h5" component="h4">{prize2}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={8}>
                                <Typography style={{ fontWeight: 600, marginTop: '10px'}} variant="h5" component="h4">3rd</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4}>
                                <Typography style={{ fontWeight: 400, marginTop: '10px'}} variant="h5" component="h4">{prize3}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={8}>
                                <Typography style={{ fontWeight: 600, marginTop: '10px'}} variant="h5" component="h4">4th</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4}>
                                <Typography style={{ fontWeight: 400, marginTop: '10px'}} variant="h5" component="h4">{prize4}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={8}>
                                <Typography style={{ fontWeight: 600, marginTop: '10px'}} variant="h5" component="h4">5th</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4}>
                                <Typography style={{ fontWeight: 400, marginTop: '10px'}} variant="h5" component="h4">{prize5}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{ padding: '72px', borderRadius: '15px', backgroundColor:'#EFEEFE', height: '15vh'}} elevation={0}>
                        <Grid container direction="row" justifyContent="center" style={{ marginTop: '40px'}}>
                            <Grid item xs={6} sm={6} md={6}>
                                <Typography style={{ marginTop: '20px', fontWeight: 600}} variant="h4" component="h4">Rules</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <Button variant="contained" color="primary" disableElevation style={{ fontSize:"30px", height: '2.5em', width:"5.5em", backgroundColor: '#74B666' }}>View</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        <Grid item sm={12} md={9}>
            <Recipe/>
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Contest;
