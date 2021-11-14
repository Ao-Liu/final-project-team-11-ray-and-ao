import React, { useState } from 'react';
import { Toolbar, Typography, Container, Grow, Grid, AppBar, TextField, Button, Paper} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import userAvatar from '../../images/user.png';
import { Check } from '@material-ui/icons';
import { getPostsBySearch } from '../../actions/posts';
import { subscribePro } from '../../actions/auth'; 
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Pro = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  let tmp = user?.result?.isPro === "true" ? true : false
  const [isPro, setIsPro] = useState(tmp)
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const handleSubscribe = () => {
    user.result.isPro = "true";
    setIsPro(true)
    localStorage.setItem('profile', JSON.stringify(user));
    dispatch(subscribePro(user.result));
  }

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Grid container direction="row" spacing={8} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={6}>
          <Paper style={{ padding: '72px', borderRadius: '15px', backgroundColor:'#FEF7CE', height: '70vh'}} elevation={0}>
            <Typography style={{ fontWeight: 600,  fontSize: "96px",textAlign:'center'}} variant="h2" component="h2">Free</Typography>
            <Grid container>
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
              <Grid item xs={12}>
                <Grid container>
                <Grid item md={3}/>
                  <Grid item md={1}>
                    <Check style={{ marginTop: '30px'}}/>
                  </Grid>
                  <Grid item md={8}>
                    <Typography style={{ fontWeight: 400, textAlign:'left', marginTop: '30px'}} variant="h5" component="h4">Sign up for official contests</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Grid container>
                <Grid item md={3}/>
                  <Grid item md={1}>
                    <Check style={{ marginTop: '30px'}}/>
                  </Grid>
                  <Grid item md={8}>
                    <Typography style={{ fontWeight: 400, textAlign:'left', marginTop: '30px'}} variant="h5" component="h4">Claim Prizes</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item md={3}/>
                  <Grid item md={1}>
                    <Check style={{ marginTop: '30px'}}/>
                  </Grid>
                  <Grid item md={8}>
                    <Typography style={{ fontWeight: 400, textAlign:'left', marginTop: '30px'}} variant="h5" component="h4">View 50,000+ recipes</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item>
                    <Button variant="contained" color="primary" disabled={true} disableElevation style={{ marginTop: '60px', fontSize:"40px", height: '3em', width:"7em", backgroundColor: '#173A56', color: '#FFF' }}>Subscribed</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
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
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item md={3}/>
                  <Grid item md={1}>
                    <Check style={{ marginTop: '30px'}}/>
                  </Grid>
                  <Grid item md={8}>
                    <Typography style={{ fontWeight: 400, textAlign:'left', marginTop: '30px'}} variant="h5" component="h4">Make your personal contests</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item md={3}/>
                  <Grid item md={1}>
                    <Check style={{ marginTop: '30px'}}/>
                  </Grid>
                  <Grid item md={8}>
                    <Typography style={{ fontWeight: 400, textAlign:'left', marginTop: '30px'}} variant="h5" component="h4">Customized rules</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item md={3}/>
                  <Grid item md={1}>
                    <Check style={{ marginTop: '30px'}}/>
                  </Grid>
                  <Grid item md={8}>
                    <Typography style={{ fontWeight: 400, textAlign:'left', marginTop: '30px'}} variant="h5" component="h4">Help us improve!</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item>
                  <Button variant="contained" color="primary" onClick={handleSubscribe} disabled={isPro} disableElevation style={{ marginTop: '60px',fontSize:"40px", height: '3em', width:"7em",backgroundColor: '#74B666',  color: '#FFF' }}>{isPro ? "Subscribed" : "Upgrade"}</Button>
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

export default Pro;
