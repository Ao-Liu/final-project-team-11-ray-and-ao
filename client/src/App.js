import React, { Profiler } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Pro from './components/Pro/Pro'
import Profile from './components/Profile/Profile';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Contest from './components/Contest/Contest';
import Submission from './components/Submission/Submission.js';
import Submissions from './components/Submission/Submissions.js';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/home" />} />
          <Route path="/home" exact component={Home} />
          <Route path="/home/search" exact component={Home} />
          <Route path="/contest/:id" exact component={Contest} />
          <Route path="/pro" exact component={Pro} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/submission" exact component={Submission} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/home" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
