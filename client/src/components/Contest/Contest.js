import React, { useState, useEffect} from 'react';
import { Toolbar, Typography, CircularProgress, Container, Grow, Grid, AppBar, TextField, Button, Paper, Avatar } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import userAvatar from '../../images/user.png';
import { getContestById } from '../../actions/contest';
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
  const { id } = useParams();
  const searchQuery = query.get('searchQuery');
  const [currentId, setCurrentId] = useState(0);
  const {contests, isLoading, recipes} = useSelector((state) => state.contests);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContestById(id));
  }, [id]);

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [prize1, setPrize1] = useState("$10");
  const history = useHistory();

  return (
    isLoading ? <CircularProgress /> : <Grow in>
      <Grid container direction="row" spacing={4} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={3} >
            <Grid container direction="column" spacing={4} justifyContent="center">
                <Grid item>
                    <Paper style={{ padding: '12vh 5vh', borderRadius: '15px', backgroundColor:'#FEF7CE'}} elevation={0}>
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
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 600, marginTop: '30px'}} variant="h5" component="h4">1st</Typography>
                                <Typography style={{ fontWeight: 600, marginTop: '30px'}} variant="h5" component="h4">2nd</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 400, marginTop: '30px', marginLeft: '20px'}} variant="h5" component="h4">$100</Typography>
                                <Typography style={{ fontWeight: 400, marginTop: '30px', marginLeft: '20px'}} variant="h5" component="h4">$50</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 600, marginTop: '30px'}} variant="h5" component="h4">3rd</Typography>
                            <Typography style={{ fontWeight: 600, marginTop: '30px'}} variant="h5" component="h4">participate</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 400, marginTop: '30px', marginLeft: '20px'}} variant="h5" component="h4">$30</Typography>
                                <Typography style={{ fontWeight: 400, marginTop: '30px', marginLeft: '20px'}} variant="h5" component="h4">$10</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{ padding: '10vh 5vh', borderRadius: '15px', backgroundColor:'#EFEEFE'}} elevation={0}>
                        <Grid container direction='row' style={{ textAlign:'center' }}>
                            <Typography style={{ fontWeight: 600}} variant="h4" component="h4">Rules</Typography>
                            <Button variant="contained" size="large" color="primary" disableElevation style={{ backgroundColor: '#82B36F', color: '#FFF', marginLeft:'20px' }}>Review</Button> 
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        <Grid item sm={12} md={9}>
            <Recipe contest={contests?.data} recipe={recipes[0]?.data}/>
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Contest;
