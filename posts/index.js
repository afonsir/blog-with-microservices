const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (request, response) => {
  return response.send(posts);
});

app.post('/posts', (request, response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = request.body;

  const newPost = { id, title };

  posts[id] = newPost;

  return response.status(201).send(newPost);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
