import React, { useState, useEffect} from 'react';
import { Typography, CircularProgress, Grow, Grid, Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getContestById } from '../../actions/contest';
import Recipe from './Recipe.js';
import possession from '../../images/possession.png'
import cash from '../../images/cash.png'

import { getPostsBySearch } from '../../actions/posts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Contest = () => {
  const { id } = useParams();
  const [rulesOpen, setRulesOpen] = useState(false);
  const {contests, isLoading, recipes} = useSelector((state) => state.contests);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContestById(id));
  }, [id]);
  const history = useHistory();

  const handleClickViewRules = () => {
    setRulesOpen(true);
  }

  const handleCloseViewRules = () => {
    setRulesOpen(false);
  }


  return (
    isLoading ? <CircularProgress /> : <Grow in>
      <Grid container direction="row" spacing={4} justifyContent="center" alignItems="center">
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
                Contest Organizer: {contests?.data?.creator} <br/><br/>
                Rules: {contests?.data?.rules} <br/><br/>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseViewRules} autoFocus> Close </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item sm={12} md={3} >
            <Grid container direction="column" spacing={4} justifyContent="center">
                <Grid item>
                    <Paper style={{ padding: '12vh 5vh', borderRadius: '15px', backgroundColor:'#FEF7CE'}} elevation={0}>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={8}>
                                <Typography style={{ fontWeight: 600}} variant="h3" component="h2">Prize</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4}>
                                {contests?.data?.prize[0].includes('$') ? <img alt="cash" src={cash} style={{height: "5vh"}}/>:
                                                        <img alt="possession" src={possession} style={{height: "5vh"}}/>}
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 600, marginTop: '10px'}} variant="h5" component="h4">1st</Typography>
                                <Typography style={{ fontWeight: 600, marginTop: '10px'}} variant="h5" component="h4">2nd</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 400, marginTop: '10px', marginLeft: '20px'}} variant="h5" component="h4">{contests?.data?.prize[0]}</Typography>
                                <Typography style={{ fontWeight: 400, marginTop: '10px', marginLeft: '20px'}} variant="h5" component="h4">{contests?.data?.prize[1]}</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 600, marginTop: '10px'}} variant="h5" component="h4">3rd</Typography>
                            <Typography style={{ fontWeight: 600, marginTop: '10px'}} variant="h5" component="h4">4th</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 400, marginTop: '10px', marginLeft: '20px'}} variant="h5" component="h4">{contests?.data?.prize[2]}</Typography>
                                <Typography style={{ fontWeight: 400, marginTop: '10px', marginLeft: '20px'}} variant="h5" component="h4">{contests?.data?.prize[3]}</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 600, marginTop: '10px'}} variant="h5" component="h4">5th</Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Typography style={{ fontWeight: 400, marginTop: '10px', marginLeft: '20px'}} variant="h5" component="h4">{contests?.data?.prize[4]}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{ padding: '10vh 5vh', borderRadius: '15px', backgroundColor:'#EFEEFE'}} elevation={0}>
                        <Grid container direction='row' style={{ textAlign:'center' }}>
                            <Typography style={{ fontWeight: 600}} variant="h4" component="h4">Rules</Typography>
                            <Button variant="contained" size="large" color="primary" onClick={handleClickViewRules} disableElevation style={{ backgroundColor: '#82B36F', color: '#FFF', marginLeft:'20px' }}>View</Button> 
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        <Grid item sm={12} md={9} >
            <Recipe contest={contests?.data} recipe={recipes[0]?.data}/>
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Contest;
