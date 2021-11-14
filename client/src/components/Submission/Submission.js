import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { deleteSubmission } from '../../actions/submission';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const Submission = ({ submission }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;

  // const openPost = (e) => {
  //   // dispatch(getPost(post._id, history));

  //   history.push(`/posts/${post._id}`);
  // };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={null}
      >
        <CardMedia className={classes.media} image={submission?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={submission?.title}/>
        <div className={classes.overlay}>
          <Typography variant="h4">Title</Typography>
          <Typography variant="h5">Description</Typography>
          <Typography variant="body2">Created At</Typography>
          {/* {moment(post.createdAt).fromNow()} */}
        </div>
        {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              // setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )} */}
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{submission?.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">message...</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === submission?.creator || user?.result?._id === submission?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deleteSubmission(submission?._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
        )}
        </CardActions>
    </Card>

  );
};

export default Submission;
