const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, status, postId } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, status, postId } = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (request, response) => {
  return response.send(posts);
});

app.post('/events', (request, response) => {
  const { type, data } = request.body;

  handleEvent(type, data);

  return response.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  const response = await axios.get('http://localhost:4005/events');

  for (let event of response.data) {
    console.log('Processing event:', event.type);

    handleEvent(event.type, event.data);
  }
});
