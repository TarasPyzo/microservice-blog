import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});
  useEffect(async () => {
    const res = await axios.get('http://localhost:4002/posts/comments');
    setPosts(res.data);
  }, []);

  return (
    <div>
      <h2>Post List</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {Object.values(posts).map(post => {
          return (
            <div key={post.id} style={{ width: '30%', backgroundColor: 'darkcyan', color: 'white', padding: '10px', margin: '10px' }}>
              <div>PostId: {post.id}</div>
              <div>Title: {post.title}</div>
              <CommentCreate postId={post.id} />
              <CommentList postId={post.id} comments={post.comments || []} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
