const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (request, response) => {
  return response.send(posts);
});

app.post('/posts/create', async (request, response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = request.body;

  const newPost = { id, title };

  posts[id] = newPost;

  await axios.post('http://event-bus-cip-srv:4005/events', {
    type: 'PostCreated',
    data: newPost
  });

  return response.status(201).send(newPost);
});

app.post('/events', (request, response) => {
  console.log('Received Event:', request.body.type);

  return response.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
