const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', (request, response) => {
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
