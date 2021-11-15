import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getSubmissionById } from '../../actions/submission';
import CommentSection from './CommentSection';
import useStyles from './styles';

const Subm = () => {
  const { submission, isLoading, submissions } = useSelector((state) => state.submissions);
  // const { submission, isLoading, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSubmissionById(id));
  }, [id]);

  // useEffect(() => {
  //   if (post) {
  //     dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
  //   }
  // }, [post]);

  if (!submission) return null;

  // const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={0} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  let date = new Date(submission?.createdAt);

  // const recommendedPosts = posts.filter(({ _id }) => _id !== submission._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px', backgroundColor: "#EFEEFF"}} elevation={0}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{submission?.title}</Typography>
          {/* <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{submission.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography> */}
          <Typography gutterBottom variant="body1" component="p">{submission?.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/submissions?user=${submission?.creator}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${submission?.creatorName}`}
            </Link>
          </Typography>
          <Typography variant="body1">{date?.getFullYear()}/{date?.getMonth()}/{date?.getDate()} {date?.toTimeString().split(' ')[0]}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection submission={submission} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={submission?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={submission?.title} />
        </div>
      </div>
      {/* {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </Paper>
  );
};

export default Subm;
