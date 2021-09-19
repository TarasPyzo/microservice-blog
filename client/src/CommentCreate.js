import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content });
    setContent('');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Create Comment</h3>
      <form onSubmit={onSubmit}>
        <label>Content</label>
        {' '}
        <input value={content} onChange={e => setContent(e.target.value)} />
        {' '}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
