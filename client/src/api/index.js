import axios from 'axios';

const API = axios.create({ baseURL: 'https://recipe-run-backend.herokuapp.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const updateUser = (id, user) => API.patch(`/user/${id}`, user);
export const fetchContest = () => API.get('/home');
export const fetchContestById = (id) => API.get(`/contest/${id}`);
export const updateContest = (id, contest) => API.patch(`/contest/${id}`, contest);
export const fetchRecentContest = () => API.get('/home/recent');
export const fetchRecipe = (id) => API.get(`/recipe/${id}`);
export const createSubmission = (newSubmission) => API.post(`/submissions`, newSubmission);
export const deleteSubmission = (id) => API.delete(`/submissions/${id}`);
export const fetchSubmissionById = (id) => API.get(`/submissions/${id}`)
export const commentSubmission = (value, id) => API.post(`/submissions/${id}/commentSubmission`, { value });
export const fetchSubmissions = () => API.get(`/submissions`);
export const fetchSubmissionsByContest = (contest) => API.get(`/submissions?contest=${contest}`);
export const fetchSubmissionsByCreator = (creator) => API.get(`/submissions?creator=${creator}`);