import React, { useState } from 'react';
import { Toolbar, Typography, Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import medal from '../../images/medal.png';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
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
      <Container maxWidth="xl">
        <Grid container justify="flex-start" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <img className={classes.image} src={medal} alt="icon" height="330px" />
          <Paper className={classes.holder}  style={{ marginLeft:'80px', height:'18em', width:'53em', padding: '20px', borderRadius: '15px', backgroundColor:'#FEF7CE',}} elevation={0}>
            <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h3" component="h2">Recipe Run #123 in</Typography>
            <Typography style={{ fontWeight: 600, textAlign:'center', marginTop: '30px'}} variant="h1" component="h2">23h 49m 26s</Typography>
            <Grid style={{ marginTop: '30px', textAlign:'center' }}>
              <Button variant="contained" size="large" color="primary" disableElevation style={{ backgroundColor: '#82B36F' }}>Register Now</Button>
              <Button variant="contained" size="large" color="primary" disableElevation style={{ backgroundColor: '#FFF', color: '#000', marginLeft:'30px' }}>FAQ</Button> 
            </Grid>
          </Paper>
        </Grid>
        <Grid container justify="flex-start" alignItems="stretch" spacing={3} style={{marginTop: '35px'}}>
          <Paper className={classes.holder} style={{ height:'13em', width:'37em', padding: '20px', borderRadius: '15px', backgroundColor:'#EFEEFE',}} elevation={0}>
            <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h4" component="h2">Recipe Run #122 review</Typography>
            <Typography style={{ fontWeight: 600, textAlign:'start', marginTop: '30px', marginLeft:'20px'}} variant="h2" component="h2">Bacon</Typography>
          </Paper>
          <Paper className={classes.holder} style={{ marginLeft:'30px', height:'13em', width:'37em', padding: '20px', borderRadius: '15px', backgroundColor:'#FAE4EC',}} elevation={0}>
            <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h4" component="h2">Recipe Run #121 review</Typography>
            <Typography style={{ fontWeight: 600, textAlign:'start', marginTop: '25px', marginLeft:'20px'}} variant="h2" component="h4">Taco</Typography>
          </Paper>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
