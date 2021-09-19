import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/posts', { title });
    setTitle('');
  };

  return (
    <div style={{ padding: '10px', backgroundColor: 'darkcyan', color: 'white' }}>
      <h2>Create Post</h2>
      <form onSubmit={onSubmit}>
        <label>Title</label>
        {' '}
        <input value={title} onChange={e => setTitle(e.target.value)} />
        {' '}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
