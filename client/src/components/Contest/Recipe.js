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
const Recipe = ({contest, recipe}) => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();
  const [ingredients, setIngredients] = useState(["Puff Pastry"]);
  const [ingMesures, setIngMesures] = useState(["320g"]);

  const [ucStartDate, setUcStartDate] = useState([]);

  const handleUpdateTime = () => {
    let ms = new Date(contest?.endDate) - new Date();
    if (ms < 0) {
      setUcStartDate("");
    } else {
      setUcStartDate(mssecondsToTime(ms));
    }
  }

  const mssecondsToTime = (secs) => {
    secs = Math.floor(secs/1000);
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.abs(Math.floor(divisor_for_minutes / 60));

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.abs(Math.ceil(divisor_for_seconds));

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  return (
    <Grow in>
        <Paper style={{ padding: '50px', borderRadius: '15px', backgroundColor:'#DFF9FF', height: '74vh'}} elevation={0}>
            <Grid container direction="row" justifyContent="center" >
                <Grid item xs={12} md={10}>
                    <Typography style={{ fontWeight: 600, marginTop:"20px"}} variant="h3" component="h2">{contest?.name} #{contest?.number}</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" color="primary" disableElevation style={{ fontSize:"30px", height: '2.5em', width:"5.5em",  backgroundColor: '#173A56' }}>Submit</Button>
                </Grid>
            </Grid>
            <Grid container justifyContent="space-evenly" alignItems="center" style={{ marginTop: "30px"}}>
                <Grid item xs={12} sm={12} md={5}>
                  <Typography style={{ fontWeight: 600, textAlign:"left"}} variant="h4" component="h4">{recipe?.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <Typography style={{ fontWeight: 600, textAlign:"center"}} variant="h4" component="h4">{recipe?.fromArea}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                  <div style={{display:'none'}}>{setInterval(handleUpdateTime, 1000)}</div>
                  <Typography style={{ fontWeight: 600, textAlign:"right"}} variant="h3" component="h4">{ucStartDate?.h}:{ucStartDate?.m}:{ucStartDate?.s}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item sm={12} md={3}>
                    <Grid container direction="column">
                        <Grid item md={3} style={{ marginTop: "30px"}}>
                            <img alt="recipe_thumb" src={recipe?.thumbUrl} style={{height: "25vh"}}/>
                        </Grid>
                        <Grid item md={9}>
                        <Typography display="inline" style={{ fontWeight: 500 }} variant="h5" component="h5">Ingredients: </Typography>
                            <Grid container>
                                <Grid item md={8}>
                                  <Grid container>
                                    {recipe?.ingredients?.map((ing, key) => (
                                      <Grid item md={12}>
                                      <Typography display="inline" key={key} style={{ fontWeight: 400, fontSize:"16px"}} variant="h5" component="h4">
                                        {ing}
                                      </Typography>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </Grid>
                                <Grid item md={4}>
                                <Grid container>
                                    {recipe?.ingMeasures?.map((ing, key) => (
                                      <Grid item md={12}>
                                        <Typography display="inline" key={key} style={{ fontWeight: 400, fontSize:"16px"}} variant="h5" component="h4">{ing}</Typography>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={9}> 
                    <Typography style={{ fontSize:"20px", marginTop: '20px', fontWeight: 400}} variant="h5" component="h4">{recipe?.instructions}</Typography>
                </Grid>
            </Grid>
        </Paper>
    </Grow>
  );
};

export default Recipe;
