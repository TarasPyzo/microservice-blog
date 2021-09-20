const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 4002;
const posts = {};

app.get('/posts/comments', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { event } = req.body;

  if (event.type === 'PostCreated') {
    const { post } = event.data;
    posts[post.id] = post;
  }
  if (event.type === 'CommentCreated') {
    const { comment } = event.data;
    const comments = posts[comment.postId].comments || [];
    comments.push({ id: comment.id, content: comment.content });
    posts[comment.postId].comments = comments;
  }

  res.send({});
});

app.listen(PORT, () => console.log(`Query service is listening on port ${PORT}`));
