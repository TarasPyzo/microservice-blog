import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});
  useEffect(async () => {
    const res = await axios.get('http://localhost:4000/posts');
    setPosts(res.data);
  }, []);

  return (
    <div>
      <h2>Post List</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {Object.keys(posts).map(postId => {
          return (
            <div key={postId} style={{ width: '30%', backgroundColor: 'darkcyan', color: 'white', padding: '10px', margin: '10px' }}>
              <div>PostId: {postId}</div>
              <div>Title: {posts[postId].title}</div>
              <CommentCreate postId={postId} />
              <CommentList postId={postId} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
