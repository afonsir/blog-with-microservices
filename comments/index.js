const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.json());

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
