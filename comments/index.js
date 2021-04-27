const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (request, response) => {
  const { id } = request.params;

  return response.send(commentsByPostId[id] || []);
});

app.post('/posts/:id/comments', (request, response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = request.body;
  const { id } = request.params;

  const comments = commentsByPostId[id] || [];
  const newComment = { id: commentId, content };

  comments.push(newComment);
  commentsByPostId[id] = comments;

  return response.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
