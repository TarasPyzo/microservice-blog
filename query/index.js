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
  console.log(`[Query Service] ${event.type}`, event);

  if (event.type === 'PostCreated') {
    const { post } = event.data;
    posts[post.id] = post;
  }
  if (event.type === 'CommentCreated') {
    const { comment } = event.data;
    const comments = posts[comment.postId].comments || [];
    comments.push({ id: comment.id, content: comment.content, status: comment.status });
    posts[comment.postId].comments = comments;
  }
  if (event.type === 'CommentUpdated') {
    const comment = posts[event.data.comment.postId].comments.find(el => el.id === event.data.comment.id);
    comment.status = event.data.comment.status;
    comment.content = event.data.comment.content;
  }

  res.send({});
});

app.listen(PORT, () => console.log(`Query service is listening on port ${PORT}`));
