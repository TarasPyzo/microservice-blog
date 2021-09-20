const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 4000;
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const post = {
    id: randomBytes(4).toString('hex'),
    title: req.body.title,
  };
  posts[post.id] = post;
  await axios.post(
    'http://localhost:4005/events',
    { event: { type: 'PostCreated', data: { post } } },
  );

  res.status(201).send(post);
});

app.post('/events', (req, res) => {
  console.log('[Posts Service]', req.body.event.type);

  res.send({});
});

app.listen(PORT, () => console.log(`Posts service is listening on port ${PORT}`));
