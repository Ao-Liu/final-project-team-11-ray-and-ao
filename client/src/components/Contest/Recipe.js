import React, { useState, useEffect } from 'react';
import { Typography, Grow, Grid, TextField, Button, Snackbar, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { useHistory, useLocation, useParams, Link } from 'react-router-dom';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createSubmission } from '../../actions/submission';


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

const Recipe = ({contest, recipe}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [submData, setSubmData] = useState({ title: '', message: '', selectedFile: '' });
  const [rulesOpen, setRulesOpen] = useState(false);
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    setInterval(handleUpdateTime, 1000)
  }, []);

  const changeTitleValue = (e) => {
    const value = e.target.value;
    setSubmData({...submData, title: value});
  }

  const changeDescriptionValue = (e) => {
    const value = e.target.value;
    setSubmData({...submData, message: value});
  }
  const { id } = useParams();

  const [ucStartDate, setUcStartDate] = useState([]);

  const handleUpdateTime = () => {
    let ms = new Date(contest?.endDate) - new Date();
    if (ms < 0) {
      setUcStartDate("");
      setEnded(true);
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

  const [openSnack, setOpenSnack] = useState(false);

  const handleSnackClick = () => {
    setOpenSnack(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const [openSnack2, setOpenSnack2] = useState(false);

  const handleSnack2Click = () => {
    setOpenSnack2(true);
  };

  const handleSnack2Close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack2(false);
  };


  const handleCloseViewRules = () => {
    setSubmData({ title: '', message: '', selectedFile: '' });
    setRulesOpen(false);
  }

  const handleClickViewRules = () => {
    setRulesOpen(true);
  }

  const handleCloseAddSubmission = () => {
    setSubmissionOpen(false);
  }

  const handleClickAddSubmission = () => {
    setSubmissionOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      handleSnack2Click();
      return;
    }
    if (!submData.selectedFile){
      handleSnackClick();
      return;
    }
    if (!submData.title){
      handleSnackClick();
      return;
    }
    user.result.attended = (parseInt(user.result.attended) + 1).toString();
    user.result.possession = (parseInt(user.result.possession) + 100).toString();
    localStorage.setItem('profile', JSON.stringify(user));
    dispatch(createSubmission({...submData, creator: user?.result?._id, creatorName: user?.result?.name, contest: contest?._id}, history, contest, user.result));
    handleCloseAddSubmission();
  };

  return (
    <Grow in>
        <Paper style={{ padding: '2vh 3vh 8vh 3vh', borderRadius: '15px', backgroundColor:'#DFF9FF', height: '74vh'}} elevation={0}>
            <Grid>
              <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="You need to include an image and title!"
                action={null}
              />
              <Snackbar
                open={openSnack2}
                autoHideDuration={6000}
                onClose={handleSnack2Close}
                message="Please Login First!"
                action={null}
              />
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
                            <Grid item md={12} key={key} >
                            <Typography component={'span'} display="inline" style={{ fontWeight: 400, fontSize:"16px"}} variant="h5" component="h4">
                              {ing}
                            </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                      <Grid item md={4}>
                      <Grid container>
                          {recipe?.ingMeasures?.map((ing, key) => (
                            <Grid item md={12} key={key} >
                              <Typography component={'span'} display="inline" key={key} style={{ fontWeight: 400, fontSize:"16px"}} variant="h5" component="h4">{ing}</Typography>
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
              <Dialog
                open={submissionOpen}
                onClose={handleCloseAddSubmission}>
                <DialogTitle id="alert-dialog-title">
                  Add Submission
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={submData.title}
                    onChange={e => changeTitleValue(e)}
                  />
                  <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={3}
                    variant="standard"
                    onChange={e => changeDescriptionValue(e)}
                    style={{marginBottom: "40px"}} 
                  />
                  <FileBase type="file" multiple={false} onDone={({ base64 }) => setSubmData({ ...submData, selectedFile: base64 })} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAddSubmission} autoFocus> Close </Button>
                  <Button onClick={handleSubmit} autoFocus> Submit </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid container direction="row" justifyContent="center" >
                <Grid item xs={12} md={9}>
                  <Typography style={{ fontWeight: 600 }} variant="h3" component="h3">{contest?.name} #{contest?.number}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  {!ended? <Button variant="contained" size="large" color="primary" onClick={handleClickAddSubmission} disableElevation style={{ backgroundColor: '#173A56', margin: '10px 20px' }}>Add Submission</Button>
                  : <Button variant="contained" component={Link} to={`/submissions?contest=${contest?._id}`} size="large" color="primary" disableElevation style={{ backgroundColor: '#173A56', margin: '10px 20px' }}>View All Submissions</Button>} 
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
                  {ended ? <Typography style={{ fontWeight: 600, textAlign:"right"}} variant="h3" component="h4">Contest Ended</Typography>
                  : <Typography style={{ fontWeight: 600, textAlign:"right"}} variant="h3" component="h4">{ucStartDate?.h}h {ucStartDate?.m}m {ucStartDate?.s}s</Typography>}
                </Grid>
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
