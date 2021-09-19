import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  useEffect(async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  }, []);

  return (
    <div style={{ marginTop: '20px', padding: '10px' }}>
      <h4>Comment List</h4>
      {comments.map(item => {
        return (
          <div key={item.id} style={{ padding: '5px', margin: '10px', border: '1px solid white' }}>
            <div>CommentId: {item.id}</div>
            <div>Content: {item.content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
