const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 4000;
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  posts[id] = { id, title: req.body.title };

  res.status(201).send(posts[id]);
});

app.listen(PORT, () => console.log(`Posts service is listening on port ${PORT}`));
