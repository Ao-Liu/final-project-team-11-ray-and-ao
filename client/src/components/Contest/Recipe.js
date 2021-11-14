import React, { useState } from 'react';
import { Toolbar, Typography, Container, Grow, Grid, AppBar, TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import userAvatar from '../../images/user.png';
import FileBase from 'react-file-base64';

import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';
import { createSubmission } from '../../actions/submission';


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
  const [submData, setSubmData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const [rulesOpen, setRulesOpen] = React.useState(false);
  const { id } = useParams();

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

  const handleCloseViewRules = () => {
    setRulesOpen(false);
  }

  const handleClickViewRules = () => {
    setRulesOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newSub = {"title":"Check out this Chinon Apple Tarts that I cooked in 2 hours",
    "selectedFile":"",
    "creator":"618707539f0d4220d553e466",
    "contest":"618b1e3e40baa84fadca8a5d"}
    dispatch(createSubmission(newSub, history))
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setSubmData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  return (
    <Grow in>
        <Paper style={{ padding: '2vh 3vh 8vh 3vh', borderRadius: '15px', backgroundColor:'#DFF9FF', height: '74vh'}} elevation={0}>
            <Grid container direction="row" justifyContent="center" >
                <Grid item xs={12} md={8}>
                  <Typography style={{ fontWeight: 600 }} variant="h3" component="h3">{contest?.name} #{contest?.number}</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setSubmData({ ...submData, selectedFile: base64 })} /></div>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button variant="contained" size="large" color="primary" onClick={handleSubmit} disableElevation style={{  backgroundColor: '#173A56', margin: '10px 20px', }}>Submit</Button> 
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

            <Grid>
              <Dialog
                open={rulesOpen}
                onClose={handleCloseViewRules}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Ingredients"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Grid container style={{ padding:'20px' }}>
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
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseViewRules} autoFocus> Close </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid container direction="row">
              <Grid item sm={12} md={3}>
                <Grid container direction="column">
                  <Grid item md={3} style={{ marginTop: "30px"}}>
                      <img alt="recipe_thumb" src={recipe?.thumbUrl} style={{height: "25vh"}}/>
                  </Grid>
                  <Grid item md={9}>
                  <Button variant="contained" size="large" color="primary" disableElevation onClick={handleClickViewRules} style={{ backgroundColor: '#82B36F', color: '#FFF', marginLeft:'20px', marginTop: '20px'}}>View Ingredients</Button> 
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
