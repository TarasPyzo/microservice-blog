const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const PORT = 4003;

app.post('/events', async (req, res) => {
  const { event } = req.body;

  if (event.type === 'CommentCreated') {
    const { comment } = event.data;
    const isInclude = comment.content.includes('orange');
    comment.status = isInclude ? 'rejected' : 'approved';
    const { id, postId, status, content } = comment;
    await axios.post(
      'http://localhost:4005/events',
      { event: { type: 'CommentModerated', data: { comment: { id, postId, status, content } } } },
    );
  }

  res.send({});
});

app.listen(PORT, () => console.log(`Moderation service is listening on port ${PORT}`));
