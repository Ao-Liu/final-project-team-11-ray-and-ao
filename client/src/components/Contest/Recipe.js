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
const Recipe = () => {
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
  const [thumbUrl, setThumbUrl] = useState("https://www.themealdb.com/images/media/meals/qtqwwu1511792650.jpg");
  const [instruction, setInstruction] = useState("To make the red wine jelly, put the red wine, jam sugar, star anise, clove, cinnamon stick, allspice, split vanilla pod and seeds in a medium saucepan. Stir together, then heat gently to dissolve the sugar. Turn up the heat and boil for 20 mins until reduced and syrupy. Strain into a small, sterilised jam jar and leave to cool completely. Will keep in the fridge for up to 1 month.\r\n\rTake the pastry out of the fridge and leave at room temperature for 10 mins, then unroll. Heat the grill to high and heat the oven to 180C/160C fan/gas 4. Cut out 2 x 13cm circles of pastry, using a plate as a guide, and place on a non-stick baking sheet. Sprinkle each circle with 1 tbsp sugar and grill for 5 mins to caramelise, watching carefully so that the sugar doesn’t burn. Remove from the grill. Can be done a few hours ahead, and left, covered, out of the fridge./r/n/rPeel, quarter and core the apples, cut into 2mm-thin slices and arrange on top of the pastry. Sprinkle over the remaining sugar and pop in the oven for 20-25 mins until the pastry is cooked through and golden, and the apples are softened. Remove and allow to cool slightly. Warm 3 tbsp of the red wine jelly in a small pan over a low heat with 1 tsp water to make it a little more runny, then brush over the top of the tarts./r/n/rTip the crème fraîche into a bowl, sift over the icing sugar and cardamom, and mix together. Carefully lift the warm tarts onto serving plates and serve with the cardamom crème fraîche.");

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
        <Paper style={{ padding: '50px', borderRadius: '15px', backgroundColor:'#DFF9FF', height: '74vh'}} elevation={0}>
            <Grid container direction="row" justifyContent="center" >
                <Grid item xs={12} md={10}>
                    <Typography style={{ fontWeight: 600, marginTop:"20px"}} variant="h3" component="h2">Random Recipe Speedrun #1</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant="contained" color="primary" disableElevation style={{ fontSize:"30px", height: '2.5em', width:"5.5em",  backgroundColor: '#173A56' }}>Submit</Button>
                </Grid>
            </Grid>
            <Grid container justifyContent="space-evenly" alignItems="center" style={{ marginTop: "30px"}}>
                <Grid item xs={12} sm={12} md={5}>
                <Typography style={{ fontWeight: 600, textAlign:"left"}} variant="h4" component="h4">Chinon Apple Tarts</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                <Typography style={{ fontWeight: 600, textAlign:"center"}} variant="h4" component="h4">French</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                <Typography style={{ fontWeight: 600, textAlign:"right"}} variant="h3" component="h4">01:23:59</Typography>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item sm={12} md={3}>
                    <Grid container direction="column">
                        <Grid item md={3} style={{ marginTop: "30px"}}>
                            <img alt="recipe_thumb" src={thumbUrl} style={{height: "25vh"}}/>
                        </Grid>
                        <Grid item md={9}>
                            <Grid container>
                                <Grid item md={8}>
                                    <Typography style={{ fontWeight: 600, marginTop: '20px'}} variant="h5" component="h4">{ingredients[0]}</Typography>
                                </Grid>
                                <Grid item md={4}>
                                    <Typography style={{ fontWeight: 400, marginTop: '20px'}} variant="h5" component="h4">{ingMesures[0]}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={9}> 
                    <Typography style={{ fontSize:"20px", marginTop: '20px', fontWeight: 400}} variant="h5" component="h4">{instruction}</Typography>
                </Grid>
            </Grid>
        </Paper>
    </Grow>
  );
};

export default Recipe;
