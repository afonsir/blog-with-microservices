const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const events = [];

app.post('/events', (request, response) => {
  const event = request.body;

  events.push(event);

  axios.post('http://posts-cip-srv:4000/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://comments-cip-srv:4001/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://query-cip-srv:4002/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://moderation-cip-srv:4003/events', event).catch((err) => {
    console.log(err.message);
  });

  response.send({ status: 'Ok' });
});

app.get('/events', (request, response) => {
  return response.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
