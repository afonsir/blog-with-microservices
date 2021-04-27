const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', (request, response) => {
  const event = request.body;

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);

  response.send({ status: 'Ok' });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
