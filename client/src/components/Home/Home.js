import React, { useState, useEffect } from 'react';
import { Typography, Grow, Grid, Button, Paper, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import medal from '../../images/medal.png';
import { getRecentContests, getRecipe } from '../../actions/contest'; 
import useStyles from './styles';
import Timer from './Timer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const {contests, isLoading, recipes} = useSelector((state) => state.contests);
  const [ucStartDate, setUcStartDate] = useState([]);
  const [started, setStarted] = useState(false);
  const [tags, setTags] = useState([]);
  const [rulesOpen, setRulesOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const curUser = JSON.parse(localStorage.getItem('profile'));
  const [user, setUser] = useState(curUser);

  useEffect(() => {
    dispatch(getRecentContests());
  }, []);

  const handleUpdateTime = () => {
    let ms = started? new Date(contests[0]?.endDate) - new Date() : new Date(contests[0]?.startDate) - new Date();
    if (ms < 0) {
      setStarted(true);
      setUcStartDate(0);
    } else {
      setUcStartDate(mssecondsToTime(ms));
    }
    // console.log(ms);
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
 
  const updateContestInfo = () => {
    // console.log(`recipes: ${JSON.stringify(recipes[0])}`);
  }

  const handleClickViewRules = () => {
    setRulesOpen(true);
  }

  const handleCloseViewRules = () => {
    setRulesOpen(false);
  }

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  const getRecipeById = (id) => {
    dispatch(getRecipe(id));
  }

  return (
    isLoading ? <CircularProgress /> : <Grow in>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid>
          <Dialog
            open={rulesOpen}
            onClose={handleCloseViewRules}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Rules"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Contest Organizer: {contests[0]?.creator} <br/><br/>
                Rules: {contests[0]?.rules} <br/><br/>
                Prize: {contests[0]?.prize.map((p) => `${p === "" ? p : `${p}, `} `)}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseViewRules} autoFocus> Close </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <img src={medal} height="350em"/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper className={classes.holder} style={{ padding: '72px', borderRadius: '15px', backgroundColor:'#FEF7CE'}} elevation={0}>
            {started ? <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h3" component="h2">{contests[0]?.name} #{contests[0]?.number} ENDS in</Typography> :
            <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h3" component="h2">{contests[0]?.name} #{contests[0]?.number} in</Typography>}
            <Timer style={{ fontWeight: 600, textAlign:'center', marginTop: '30px'}} date={started ? contests[0]?.endDate : contests[0]?.startDate}/>
            <div style={{display:'none'}}>{setInterval(handleUpdateTime, 1000)}</div>
            <Grid style={{ marginTop: '30px', textAlign:'center' }}>
              {started ? <Button variant="contained" size="large" color="primary" 
              onClick={updateContestInfo} component={Link} to={curUser == null ? `/auth` : `/contest/${contests[0]?._id}`} 
              disableElevation style={{ backgroundColor: '#82B36F', fontSize:"26px", height: '2.5em',}}>Register Now</Button> : null}
              <Button variant="contained" size="large" color="primary" disableElevation onClick={handleClickViewRules} 
                      style={{ backgroundColor: '#FFF', color: '#000', marginLeft:'30px', fontSize:"26px", height: '2.5em', width:"5.5em"}}
                      >Rules</Button> 
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.holder} style={{ padding: '50px', borderRadius: '15px', height:"25vh", backgroundColor:'#EFEEFE',}} elevation={0}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h4" component="h2">{contests[1]?.name} #{contests[1]?.number} review</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={4}>
                      <img alt="recipe_thumb" src={recipes[1]?.data?.thumbUrl} style={{height: "20vh"}}/>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center">
                        <Grid item>
                          <Typography style={{ fontWeight: 600, textAlign:'start', marginTop: '30px', marginLeft:'20px'}} variant="h2" component="h2">{recipes[1]?.data?.name}</Typography>
                        </Grid>
                        <Grid item>
                          <Button component={Link} to={`/contest/${contests[1]?._id}`} 
                                  variant="contained" 
                                  size="large" 
                                  color="primary" 
                                  disableElevation 
                                  style={{ fontSize:"26px", backgroundColor: '#82B36F', height: '2.5em', width:"5.5em", color: '#FFF', marginLeft:'30px', marginTop: '30px' }}
                                  >Review</Button>  
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.holder} style={{padding: '50px', borderRadius: '15px', height:"25vh", backgroundColor:'#FAE4EC',}} elevation={0}>
          <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                <Typography style={{ fontWeight: 600, marginLeft: '10px' }} variant="h4" component="h2">{contests[2]?.name} #{contests[2]?.number} review</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row" spacing={1} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={4}>
                      <img alt="recipe_thumb2" src={recipes[2]?.data?.thumbUrl} style={{height: "20vh"}}/>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center">
                        <Grid item>
                        <Typography style={{ fontWeight: 600, textAlign:'start', marginTop: '25px', marginLeft:'20px'}} variant="h2" component="h4">{recipes[2]?.data?.name}</Typography>
                        </Grid>
                        <Grid item>
                        <Button component={Link} 
                                to={`/contest/${contests[2]?._id}`} 
                                variant="contained" size="large" 
                                color="primary" 
                                disableElevation 
                                style={{ fontSize:"26px", backgroundColor: '#82B36F', height: '2.5em', width:"5.5em", color: '#FFF', marginLeft:'30px', marginTop: '30px' }}
                                >Review</Button> 
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>        
          </Paper>
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Home;
