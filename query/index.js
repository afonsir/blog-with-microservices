const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (request, response) => {
  return response.send(posts);
});

app.post('/events', (request, response) => {
  const { type, data } = request.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];

    post.comments.push({ id, content });
  }

  return response.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
