import React from 'react';

import PostCreate from './PostCreate';
import PostList from './PostList';

function App() {
  return (
    <div style={{ margin: '20px' }}>
      <h1>Blog app</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
