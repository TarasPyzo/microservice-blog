const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 4001;
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id: postId } = req.params;
  const comment = {
    id: randomBytes(4).toString('hex'),
    content: req.body.content,
  };
  const comments = commentsByPostId[postId] || [];
  comments.push(comment);
  commentsByPostId[postId] = comments;
  await axios.post(
    'http://localhost:4005/events',
    { event: { type: 'CommentCreated', data: { comment: { ...comment, postId } } } },
  );

  res.status(201).send(comment);
});

app.post('/events', (req, res) => {
  console.log('[Comments Service]', req.body.event.type);

  res.send({});
});

app.listen(PORT, () => console.log(`Comments service is listening on port ${PORT}`));
